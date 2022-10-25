import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authorization.split(" ");

  try {
    const decoded = verify(token, "secret") as TokenPayload;
    const now = new Date().getTime();

    if (decoded.exp < now) {
      return res.status(401).json({ error: "Token expired" });
    }

    next();
  } catch (error) {
    return res.json(401).json({ error: "Invalid token" });
  }
}
