import express from "express";

import { AuthRouter, CollectionRouter, UserRouter } from "./routes";
import { DonationRouter } from "./routes/donation.router";

const app = express();
app.use(express.json());

app.use(AuthRouter);
app.use(UserRouter);
app.use(DonationRouter);
app.use(CollectionRouter);

app.listen(8080, () => console.log("Server is on fire"));
