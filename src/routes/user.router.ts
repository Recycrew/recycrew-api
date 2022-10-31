import { Router } from "express";
import { UserController } from "../controllers";
// import { authMiddleware } from "../middlewares";

export const UserRouter = Router();

UserRouter.post("/register", UserController.registerUser);
// UserRouter.use(authMiddleware);
UserRouter.get("/users", UserController.getUsers);
UserRouter.get("/user", UserController.getUser);
UserRouter.put("/set_collector", UserController.setUserCollector);
UserRouter.put("/user", UserController.updateUser);


