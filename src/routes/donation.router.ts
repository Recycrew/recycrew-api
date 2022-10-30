import { Router } from "express";
import { DonationController } from "../controllers";

export const DonationRouter = Router();

DonationRouter.post("/donation/create", DonationController.create);
DonationRouter.get("/donation", DonationController.getDonation);
