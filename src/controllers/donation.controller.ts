import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

class DonationController {
  async createDonation(req: Request, res: Response) {
    try {
      const prisma = new PrismaClient();

      const { material, donorId, description } = req.body;

      const donation = await prisma.donation.create({
        data: {
          material,
          donorId,
          description,
        },
      });

      return res.status(201).json(donation);
    } catch (error) {
      return res
        .status(500)
        .json({ error: error, message: "Couldn't create donation" });
    }
  }

  async getDonations(req: Request, res: Response) {
    try {
      const prisma = new PrismaClient();

      const donation = await prisma.donation.findMany();

      return res.status(200).json(donation);
    } catch (error) {
      return res
        .status(500)
        .json({ error: error, message: "Couldn't get donation" });
    }
  }
}

export default new DonationController();
