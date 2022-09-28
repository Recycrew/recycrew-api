import { Request, Response } from "express";
import UserService from "../services/UserService";

export default class UserController {
  constructor(
    public userService: UserService
  ) {}
  public async createUser(req: Request, res: Response) {
    try {
      const { data } = req.body;

      const res = await this.userService.createUser(data);

      return { status: 200, res }
    } catch (err) {
      return { status: 500, error: err}
    }
  }
}