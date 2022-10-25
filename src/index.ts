import express from "express";
import { authMiddleware } from "./middlewares";
// import { authMiddleware } from "./middlewares";

import { AuthRouter, UserRouter } from "./routes";

const app = express();
app.use(express.json());

app.use(AuthRouter);
app.use(UserRouter);
app.use(authMiddleware);

app.listen(8080, () => console.log("Server is on fire"));
