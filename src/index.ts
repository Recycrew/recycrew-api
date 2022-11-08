import express from "express";
import { CorsMiddleware } from "./middlewares";

import { CollectionRouter, UserRouter } from "./routes";
import { DonationRouter } from "./routes/donation.router";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(CorsMiddleware);
app.use(UserRouter);
app.use(DonationRouter);
app.use(CollectionRouter);
app.listen(port, () => console.log("Server is on fire, port:", port));
