import { FastifyInstance } from 'fastify'
import { jwtAuth } from '../../auth/jwtAuth'
import { FetchUsersUseCase } from '../../../../application/use-cases/FetchUsers'
import { container, TOKENS } from '../../../di/container'

export async function fetchUsers(app: FastifyInstance) {
  app.addHook('preHandler', jwtAuth)
  app.get('/', async (request, reply) => {
    const usersRepository = container.get(TOKENS.userRepository)
    const fetchUsersUseCase = new FetchUsersUseCase(usersRepository)

    const users = await fetchUsersUseCase.execute()

    return reply.send({
      users,
    })
  })
}
