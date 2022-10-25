import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Request, Response } from "express";

class AuthController {
  async auth(req: Request, res: Response) {
    const prismaClient = new PrismaClient();
    const { email, password } = req.body;

    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.json({ error: "User not found" });
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      return res.json({ error: "Invalid password" });
    }

    const token = sign({ id: user.id }, "secret", { expiresIn: "1m" });
    const { password: userPassword, ...userWithoutPassword } = user;
    res.json({ ...userWithoutPassword, token });
  }
}
export default new AuthController();
