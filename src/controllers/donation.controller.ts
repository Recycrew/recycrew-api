import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

class DonationController {
  async createDonation(req: Request, res: Response) {
    try {
      const prisma = new PrismaClient();

      const { material, donorId, description } = req.body;

      const donationAlreadyExists = await prisma.donation.findFirst({
        where: {
          donorId: donorId,
          material: material,
          description: description,
        },
      });

      if (donationAlreadyExists) {
        return res.status(400).json({ message: "Donation already exists" });
      }

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

  async deleteDonation(req: Request, res: Response) {
    try {
      const prisma = new PrismaClient();

      const { id } = req.body;
      const deleteDonation = await prisma.donation.delete({
        where: {
          id: id,
        },
      });

      return res.status(200).json(deleteDonation);
    } catch (error) {
      return res
        .status(500)
        .json({ error: error, message: "Couldn't get delete donation" });
    }
  }
}

export default new DonationController();
