import { hash } from 'bcryptjs'
import { database } from '../database'
import { User } from '../entity/User'
import { EmailAlreadyInUseError } from '../errors/EmailAlreadyInUseError'

interface CreateUserData {
  email: string
  password: string
}

export class CreateUserUseCase {
  async execute({ email, password }: CreateUserData): Promise<void> {
    const emailAlreadyInUse = await database<User>('users')
      .first()
      .where('email', email)

    if (emailAlreadyInUse) {
      throw new EmailAlreadyInUseError()
    }

    const hashedPassword = await hash(password, 8)

    await database<User>('users').insert({
      email,
      password: hashedPassword,
    })
  }
}
