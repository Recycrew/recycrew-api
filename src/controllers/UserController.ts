import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
  public async createUser(req: Request, res: Response) {
    try {
      const { data } = req.body;

      const res = await UserService.createUser(data);

      return { status: 200, res }
    } catch (err) {
      return { status: 500, error: err}
    }
  }
}
export default new UserController();