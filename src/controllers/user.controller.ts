import { Request, Response } from "express";
import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

class UserController {
  async register(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const { name, email, password } = req.body;
    const hashedPassword = await hash(password, 8);

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if(userAlreadyExists) {
      return res.json({ error: "User already exists"});
    }
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        address: "saksasa",
        document_number: "21m12ml21m",
        is_collector: false,
        document_type: "RG",
      },
    });

    res.json(user);
  }

  async getUsers(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const users = await prisma.user.findMany();
    res.json(users);
  }
  async getUser(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    res.json(user);
  }
}

export default new UserController();
