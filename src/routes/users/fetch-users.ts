import { FastifyInstance } from 'fastify'
import jwt from 'jsonwebtoken'
import { database } from '../../database'
import { User } from './create-user'

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

    const users = await database<User>('users').select(
      'id',
      'email',
      'created_at',
    )

    return reply.send({
      users,
    })
  })
}
