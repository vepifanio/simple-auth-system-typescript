import { database } from '..'
import { User } from '../../application/entity/User'
import { UsersRepository } from '../../application/repository/UsersRepository'

export class KnexUsersRepository implements UsersRepository {
  async findAll(): Promise<User[]> {
    const users = await database('users').select('id', 'email', 'created_at')

    return users
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await database('users').first().where('email', email)

    if (!user) {
      return null
    }

    return user
  }

  async save(user: User): Promise<void> {
    await database('users').insert({
      id: user.id,
      email: user.email,
      password: user.password,
      created_at: user.createdAt,
    })
  }
}
