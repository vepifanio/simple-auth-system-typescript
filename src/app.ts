import Fastify from 'fastify'
import dotenv from 'dotenv'
import { usersRoutes } from './routes/users'
import { loginRoutes } from './routes/login'

dotenv.config()

const app = Fastify({ logger: true })

app.register(usersRoutes, {
  prefix: '/users',
})

app.register(loginRoutes, {
  prefix: '/login',
})

export { app }
