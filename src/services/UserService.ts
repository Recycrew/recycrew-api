import { IUsers } from "../interfaces/interfaces";
import UserRepository from "../repositories/UserRepository";

export default class UserService {
  constructor(
    public userRepository: UserRepository
    ) {}
  public async createUser(data: IUsers) {
    try {
      const user = await this.userRepository.createUser(data);
      return user;
    } catch (err) {
      return { status: 500, error: err }
    }
  }
}
  