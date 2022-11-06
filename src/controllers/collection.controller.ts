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
        throw new Error("Collection already exists");
      }

      const collect = await prisma.collect.create({
        data: {
          collectorId: collectorId,
          donationId: donationId
        },
      });
      
      res.json(collect);
    } catch (error) {
      throw new Error("Couldn't create collection");
    }
  }

  async getCollection(req: Request, res: Response) {
    try {
      const prisma = new PrismaClient();

      res.json(await prisma.collect.findMany());
    } catch (error) {
      throw new Error("Couldn't get collections");
    }
  }
}

export default new CollectionController();
