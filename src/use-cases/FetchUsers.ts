import { database } from '../database'
import { User } from '../entity/User'

export class FetchUsersUseCase {
  async execute() {
    const users = await database<User>('users').select(
      'id',
      'email',
      'created_at',
    )

    return users
  }
}
