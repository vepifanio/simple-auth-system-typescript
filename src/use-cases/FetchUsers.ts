import { UsersRepository } from '../repository/UsersRepository'

export class FetchUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute() {
    const users = await this.usersRepository.findAll()

    return users
  }
}
