import Fastify from 'fastify'
import { z } from 'zod'
import { database } from './database'
import { hash } from 'bcryptjs'

const app = Fastify({ logger: true })

interface User {
  id: string
  email: string
  password: string
}

const createUserRequestBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Password must have at least 6 characters.',
  }),
})

app.post('/users', async (request, reply) => {
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

app.get('/users', async (request, reply) => {
  const users = await database<User>('users').select('*')

  return reply.send({
    users,
  })
})

export { app }
