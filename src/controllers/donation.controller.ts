import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

class DonationController {
  async create(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const { material, donor, donorId, description } = req.body;

    const donation = await prisma.donation.create({
      data: {
        material, donor, donorId, description
      },
    });

    res.json(donation);
  }

  async getDonation(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const donation = await prisma.donation.findMany();
    res.json(donation);
  }
}

export default new DonationController();
