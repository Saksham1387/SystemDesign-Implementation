import { UserRepository } from "../repositories/user"
import { User } from "../user.model"


export class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findById(id)
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    return this.userRepository.create(userData)
  }

  async listUsers(limit: number = 10, offset: number = 0): Promise<User[]> {
    return this.userRepository.findMany(limit, offset)
  }
}