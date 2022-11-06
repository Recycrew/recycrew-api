import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

class CollectionController {
  async createCollection(req: Request, res: Response) {
    try {
      const prisma = new PrismaClient();

      const { donationId, collectorId } = req.body;

      const collectionAlreadyExists = await prisma.collect.findUnique({
        where: {
          donationId: donationId,
        },
      });

      if (collectionAlreadyExists) {
        return res.status(400).json({ message: "Collection already exists" });
      }

      const collect = await prisma.collect.create({
        data: {
          collectorId: collectorId,
          donationId: donationId,
        },
      });

      return res.status(201).json(collect);
    } catch (error) {
      return res
        .status(500)
        .json({ error: error, message: "Couldn't create collection" });
    }
  }

  async getCollection(req: Request, res: Response) {
    try {
      const prisma = new PrismaClient();

      return res.status(200).json(
        await prisma.collect.findMany({
          select: {
            donation: true,
            collector: true,
          },
        })
      );
    } catch (error) {
      return res
        .status(500)
        .json({ error: error, message: "Couldn't get collections" });
    }
  }
}

export default new CollectionController();
