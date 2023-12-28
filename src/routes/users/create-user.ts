import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { database } from '../../database'
import { hash } from 'bcryptjs'

export interface User {
  id: string
  email: string
  password: string
  created_at: string
}

const createUserRequestBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Password must have at least 6 characters.',
  }),
})

export async function createUserRoute(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const { email, password } = createUserRequestBodySchema.parse(request.body)

    const emailAlreadyExists = await database<User>('users')
      .first()
      .where('email', email)

    if (emailAlreadyExists) {
      return reply.status(400).send({
        message: 'Email is already in use.',
      })
    }

    const hashedPassword = await hash(password, 8)

    await database<User>('users').insert({
      email,
      password: hashedPassword,
    })

    return reply.status(201).send()
  })
}
