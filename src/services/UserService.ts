import { IUsers } from "../interfaces/interfaces";
import UserRepository from "../repositories/UserRepository";

class UserService {
  public async createUser(data: IUsers) {
    try {
      const user = await UserRepository.createUser(data);
      return user;
    } catch (err) {
      return { status: 500, error: err }
    }
  }
}
export default new UserService()  ;