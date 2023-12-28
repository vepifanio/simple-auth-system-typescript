import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { CreateUserUseCase } from '../../use-cases/CreateUser'
import { EmailAlreadyInUseError } from '../../errors/EmailAlreadyInUseError'

const createUserRequestBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Password must have at least 6 characters.',
  }),
})

export async function createUserRoute(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const { email, password } = createUserRequestBodySchema.parse(request.body)
    const createUserUseCase = new CreateUserUseCase()

    try {
      await createUserUseCase.execute({
        email,
        password,
      })
      return reply.status(201).send()
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return reply.status(400).send({
          message: error.message,
        })
      }

      return reply.status(500).send({
        message: error,
      })
    }
  })
}
