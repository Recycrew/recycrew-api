import { Request, Response } from "express";
import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

class UserController {
  async register(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const { name, email, password } = req.body;
    const hashedPassword = await hash(password, 8);

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
}

export default new UserController();
