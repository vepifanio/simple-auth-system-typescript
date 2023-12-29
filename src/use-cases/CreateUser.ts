import { hash } from 'bcryptjs'
import { User } from '../entity/User'
import { EmailAlreadyInUseError } from '../errors/EmailAlreadyInUseError'
import { UsersRepository } from '../repository/UsersRepository'

interface CreateUserData {
  email: string
  password: string
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: CreateUserData): Promise<void> {
    const emailAlreadyInUse = await this.usersRepository.findByEmail(email)

    if (emailAlreadyInUse) {
      throw new EmailAlreadyInUseError()
    }

    const hashedPassword = await hash(password, 8)

    const user = User.create({
      email,
      password: hashedPassword,
    })

    await this.usersRepository.save(user)
  }
}
