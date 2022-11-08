import { Request, Response } from "express";
import { compare, hash } from "bcryptjs";
import { prismaService } from "../service/prisma.service";

class UserController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const userExists = await prismaService
        .handler()
        .user.findUnique({ where: { email } });
      if (!userExists) return res.status(400).json("User don't exists!");

      const passwordOk = compare(password, userExists.password);
      if (!passwordOk) return res.status(400).json("Wrong credentials!");

      res.json(userExists);
    } catch (error) {
      res.status(400).json({ error, message: "Something went wrong!" });
    }
  }

  async registerUser(req: Request, res: Response) {
    try {
      const {
        name,
        email,
        password,
        address,
        document_number,
        is_collector,
        document_type,
      } = req.body;
      const hashedPassword = await hash(password, 8);

      const userAlreadyExists = await prismaService.handler().user.findUnique({
        where: {
          email: email,
        },
      });

      if (userAlreadyExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      const user = await prismaService.handler().user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          address,
          document_number,
          is_collector,
          document_type,
        },
      });

      return res.status(201).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ error: error, message: "Couldn't create user" });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await prismaService.handler().user.findMany();

      return res.status(200).json(users);
    } catch (error) {
      return res
        .status(500)
        .json({ error: error, message: "Couldn't get users" });
    }
  }
  async getUser(req: Request, res: Response) {
    try {
      const email = req.query.email as string;

      const user = await prismaService.handler().user.findUnique({
        where: {
          email: email,
        },
      });

      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ error: error, message: "Couldn't get specific user" });
    }
  }

  async setUserCollector(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const userCollector = await prismaService.handler().user.update({
        where: {
          email: email,
        },
        data: {
          is_collector: true,
        },
      });

      return res.status(200).json(userCollector);
    } catch (error) {
      return res
        .status(500)
        .json({ error: error, message: "Couldn't set user as collector" });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { email, document_type, document_number, address } = req.body;

      const userUpdated = await prismaService.handler().user.update({
        where: {
          email: email,
        },
        data: {
          document_type: document_type,
          document_number: document_number,
          address: address,
        },
      });

      return res.status(201).json(userUpdated);
    } catch (error) {
      return res
        .status(500)
        .json({ error: error, message: "Couldn't update user" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const user = await prismaService.handler().user.delete({
        where: {
          email: email,
        },
      });

      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ error: error, message: "Couldn't delete user" });
    }
  }
}

export default new UserController();
