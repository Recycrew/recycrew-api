import { Request, Response } from "express";
import { compare, hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

class UserController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const prisma = new PrismaClient();

    try {
      const userExists = await prisma.user.findUnique({ where: { email } });
      if (!userExists) return res.status(400).json("User don't exists!");

      const passwordOk = compare(password, userExists.password);
      if (!passwordOk) return res.status(400).json("Wrong credentials!");

      res.json(Math.random().toString(16));
    } catch (error) {
      res.status(400).json({ error, message: "Something went wrong!" });
    }
  }

  async registerUser(req: Request, res: Response) {
    try {
      const prisma = new PrismaClient();

      const { name, email, password } = req.body;
      const hashedPassword = await hash(password, 8);

      const userAlreadyExists = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (userAlreadyExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          address: "address",
          document_number: "doc_number",
          is_collector: false,
          document_type: "CPF",
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
      const prisma = new PrismaClient();
      const users = await prisma.user.findMany();

      return res.status(200).json(users);
    } catch (error) {
      return res
        .status(500)
        .json({ error: error, message: "Couldn't get users" });
    }
  }
  async getUser(req: Request, res: Response) {
    try {
      const prisma = new PrismaClient();

      const { email } = req.body;

      const user = await prisma.user.findUnique({
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
      const prisma = new PrismaClient();

      const { email } = req.body;

      const userCollector = await prisma.user.update({
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
      const prisma = new PrismaClient();

      const { email, document_type, document_number, address } = req.body;

      const userUpdated = await prisma.user.update({
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
      const prisma = new PrismaClient();

      const { email } = req.body;

      const user = await prisma.user.delete({
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
