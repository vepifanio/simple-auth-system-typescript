import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'

export async function jwtAuth(request: FastifyRequest, reply: FastifyReply) {
  const authorizationHeader = request.headers.authorization

  if (!authorizationHeader) {
    return reply.status(401).send({
      message: 'Unauthorized.',
    })
  }

  const accessToken = authorizationHeader.split('Bearer')[1].trim()

  if (!accessToken) {
    return reply.status(401).send({
      message: 'Unauthorized.',
    })
  }

  jwt.verify(accessToken, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return reply.status(401).send({
        message: 'Unauthorized.',
      })
    }

    const { sub } = decoded as { sub: string }
    request.user = sub
  })
}
