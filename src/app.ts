import Fastify from 'fastify'
import { z } from 'zod'
import { database } from './database'
import { hash } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const app = Fastify({ logger: true })

interface User {
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
  const authorizationHeader = request.headers.authorization

  if (!authorizationHeader) {
    return reply.status(401).send({
      message: 'Unauthorized',
    })
  }

  const accessToken = authorizationHeader.split('Bearer')[1].trim()

  if (!accessToken) {
    return reply.status(401).send({
      message: 'Unauthorized',
    })
  }

  jwt.verify(accessToken, process.env.JWT_SECRET, (error) => {
    if (error) {
      return reply.status(401).send({
        message: 'Unauthorized',
      })
    }
  })

  const users = await database<User>('users').select(
    'id',
    'email',
    'created_at',
  )

  return reply.send({
    users,
  })
})

const loginRequestBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

app.post('/login', async (request, reply) => {
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

export { app }
