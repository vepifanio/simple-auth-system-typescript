import { FastifyInstance } from 'fastify'
import jwt from 'jsonwebtoken'
import { FetchUsersUseCase } from '../../application/use-cases/FetchUsers'
import { KnexUsersRepository } from '../../database/repository/KnexUsersRepository'
import { jwtAuth } from '../../auth/jwtAuth'

export async function fetchUsers(app: FastifyInstance) {
  app.addHook('preHandler', jwtAuth)
  app.get('/', async (request, reply) => {
    const usersRepository = new KnexUsersRepository()
    const fetchUsersUseCase = new FetchUsersUseCase(usersRepository)

    const users = await fetchUsersUseCase.execute()

    return reply.send({
      users,
    })
  })
}
