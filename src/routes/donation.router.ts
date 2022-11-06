import { Router } from "express";
import { DonationController } from "../controllers";

export const DonationRouter = Router();

DonationRouter.post("/donation/create", DonationController.createDonation);
DonationRouter.get("/donation", DonationController.getDonations);
