import { FastifyInstance } from 'fastify'
import { createUserRoute } from './create-user'
import { fetchUsers } from './fetch-users'

export async function usersRoutes(app: FastifyInstance) {
  app.register(createUserRoute)
  app.register(fetchUsers)
}
