import { Router } from "express";
import { UserController } from "../controllers";

export const UserRouter = Router();

UserRouter.post("/register", UserController.registerUser);
UserRouter.get("/users", UserController.getUsers);
UserRouter.get("/user", UserController.getUser);
UserRouter.put("/set_collector", UserController.setUserCollector);
UserRouter.put("/user", UserController.updateUser);
UserRouter.delete("/user", UserController.deleteUser);
