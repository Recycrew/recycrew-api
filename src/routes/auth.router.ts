import { Router } from "express";
import { AuthController } from "../controllers";

export const AuthRouter = Router();

AuthRouter.post("/auth", AuthController.auth);
