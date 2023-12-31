import { Container, token } from 'brandi'
import { UsersRepository } from '../../application/repository/UsersRepository'
import { KnexUsersRepository } from '../database/repository/KnexUsersRepository'

export const TOKENS = {
  userRepository: token<UsersRepository>('usersRepository'),
}

const container = new Container()

container
  .bind(TOKENS.userRepository)
  .toInstance(KnexUsersRepository)
  .inSingletonScope()

export { container }
