import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

class DonationController {
  async createDonation(req: Request, res: Response) {
    try {
      const prisma = new PrismaClient();
      const { material, donorId, description } = req.body;
  
      const donation = await prisma.donation.create({
        data: {
          material, donorId, description
        },
      });
  
      res.json(donation);
    } catch (error) {
      throw new Error("Couldn't create donation");
    }
  }

  async getDonation(req: Request, res: Response) {
    try {
      const prisma = new PrismaClient();
      const donation = await prisma.donation.findMany();
      res.json(donation);
    } catch (error) {
      throw new Error("Couldn't get donation");
    }
  }
}

export default new DonationController();
