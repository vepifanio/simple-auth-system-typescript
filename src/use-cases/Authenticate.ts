import { compare } from 'bcryptjs'
import { database } from '../database'
import { User } from '../entity/User'
import { InvalidCredentialsError } from '../errors/InvalidCredentialsError'

interface AuthenticateUseCaseData {
  email: string
  password: string
}

export class AuthenticateUseCase {
  async execute({ email, password }: AuthenticateUseCaseData) {
    const user = await database<User>('users').first().where('email', email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const isReceivedPasswordCorrect = await compare(password, user.password)

    if (!isReceivedPasswordCorrect) {
      throw new InvalidCredentialsError()
    }

    return user.id
  }
}
