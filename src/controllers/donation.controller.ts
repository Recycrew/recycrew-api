import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

class DonationController {
  async create(req: Request, res: Response) {
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
      return res.json({ error: "Couldn't create donation" });
    }
  }

  async getDonation(req: Request, res: Response) {
    try {
      const prisma = new PrismaClient();
      const donation = await prisma.donation.findMany();
      res.json(donation);
    } catch (error) {
      return res.json({ error: "Couldn't get donation" });
    }
  }
}

export default new DonationController();
