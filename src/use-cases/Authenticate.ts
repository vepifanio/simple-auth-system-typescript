import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/InvalidCredentialsError'
import { UsersRepository } from '../repository/UsersRepository'

interface AuthenticateUseCaseData {
  email: string
  password: string
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: AuthenticateUseCaseData) {
    const user = await this.usersRepository.findByEmail(email)

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
