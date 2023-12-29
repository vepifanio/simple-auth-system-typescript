import { FastifyInstance } from 'fastify'
import jwt from 'jsonwebtoken'
import { FetchUsersUseCase } from '../../application/use-cases/FetchUsers'
import { KnexUsersRepository } from '../../database/repository/KnexUsersRepository'

export async function fetchUsers(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
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

    const usersRepository = new KnexUsersRepository()
    const fetchUsersUseCase = new FetchUsersUseCase(usersRepository)

    const users = await fetchUsersUseCase.execute()

    return reply.send({
      users,
    })
  })
}
