import { Request, Response } from "express";
import { prismaService } from "../service/prisma.service";

class DonationController {
  async createDonation(req: Request, res: Response) {
    try {
      const { material, donorId, description } = req.body;

      const donationAlreadyExists = await prismaService
        .handler()
        .donation.findFirst({
          where: {
            donorId: donorId,
            material: material,
            description: description,
          },
        });

      if (donationAlreadyExists) {
        return res.status(400).json({ message: "Donation already exists" });
      }

      const donation = await prismaService.handler().donation.create({
        data: {
          material,
          donorId,
          description,
        },
      });

      return res.status(201).json(donation);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: error, message: "Couldn't create donation" });
    }
  }

  async getDonations(req: Request, res: Response) {
    try {
      const donation = await prismaService.handler().donation.findMany({
        select: {
          donor: true,
          description: true,
          material: true,
          id: true,
        },
      });

      return res.status(200).json(donation);
    } catch (error) {
      return res
        .status(500)
        .json({ error: error, message: "Couldn't get donation" });
    }
  }

  async deleteDonation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleteDonation = await prismaService.handler().donation.delete({
        where: {
          id: Number(id),
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
