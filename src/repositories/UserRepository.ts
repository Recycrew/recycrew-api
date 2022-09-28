import { AppDataSource } from "../data-source";
import { IUsers } from "../interfaces/interfaces";

export default class UserRepository {
  public async createUser(data: IUsers) {
    try {
      const insert = await AppDataSource.createQueryBuilder()
        .insert()
        .into("users")
        .values([
          { name: data.name},
          { email: data.email},
        ])
        .execute();
        return { success: true, insert }
    } catch (error) {
      return {err: error, message: "erro ao criar usuário"};
    }
  }
}
