import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import jwt from 'jsonwebtoken'

import { AuthenticateUseCase } from '../../../../application/use-cases/Authenticate'
import { InvalidCredentialsError } from '../../../../application/errors/InvalidCredentialsError'
import { container, TOKENS } from '../../../di/container'

const loginRequestBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function loginRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const { email, password } = loginRequestBodySchema.parse(request.body)
    const usersRepository = container.get(TOKENS.userRepository)
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    try {
      const subject = await authenticateUseCase.execute({ email, password })

      const accessToken = jwt.sign({}, process.env.JWT_SECRET, {
        subject,
      })

      return reply.send({
        accessToken,
      })
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return reply.status(401).send({
          message: error.message,
        })
      }

      return reply.status(400).send({
        message: error,
      })
    }
  })
}
