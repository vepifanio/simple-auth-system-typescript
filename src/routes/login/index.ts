import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { database } from '../../database'
import { User } from '../users/create-user'
import { hash } from 'bcryptjs'
import jwt from 'jsonwebtoken'

const loginRequestBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function loginRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const { email, password } = loginRequestBodySchema.parse(request.body)

    const user = await database<User>('users').first().where('email', email)

    if (!user) {
      return reply.status(401).send({
        message: 'Unauthorized',
      })
    }

    const receivedHashedPassword = await hash(password, user.password)

    if (receivedHashedPassword !== user.password) {
      return reply.status(401).send({
        message: 'Unauthorized',
      })
    }

    const accessToken = jwt.sign({}, process.env.JWT_SECRET, {
      subject: user.id,
    })

    return reply.send({
      accessToken,
    })
  })
}
