import { Request, Response } from "express";
import { prismaService } from "../service/prisma.service";

class CollectionController {
  async createCollection(req: Request, res: Response) {
    try {
      const { donationId, collectorId } = req.body;

      const collectionAlreadyExists = await prismaService
        .handler()
        .collect.findUnique({
          where: {
            donationId: donationId,
          },
        });

      if (collectionAlreadyExists) {
        return res.status(400).json({ message: "Collection already exists" });
      }

      const collect = await prismaService.handler().collect.create({
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

  async getCollections(req: Request, res: Response) {
    try {
      return res.status(200).json(
        await prismaService.handler().collect.findMany({
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

  async deleteCollection(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleteCollection = await prismaService.handler().collect.delete({
        where: {
          id: Number(id),
        },
      });

      return res.status(200).json(deleteCollection);
    } catch (error) {
      return res
        .status(500)
        .json({ error: error, message: "Couldn't delete collection" });
    }
  }

  async getCollectionsById(req: Request, res: Response) {
    const { collectorId } = req.params;

    const collections = await prismaService.handler().collect.findMany({
      select: {
        donation: {
          select: {
            donor: true,
            description: true,
            material: true,
            id: true,
          },
        },
        id: true,
      },
      where: {
        collectorId: Number(collectorId),
      },
    });

    if (!collections.length) return res.status(400).json("Não há coletas");

    res.json(collections);
  }
}

export default new CollectionController();
