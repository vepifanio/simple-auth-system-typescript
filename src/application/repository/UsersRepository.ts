import { User } from '../entity/User'

export interface UsersRepository {
  findAll(): Promise<User[]>
  findByEmail(email: string): Promise<User | null>
  save(user: User): Promise<void>
}
