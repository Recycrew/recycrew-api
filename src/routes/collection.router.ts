import { Router } from "express";
import { CollectionController } from "../controllers";

export const CollectionRouter = Router();

CollectionRouter.post(
  "/collection/create",
  CollectionController.createCollection
);
CollectionRouter.get("/collection", CollectionController.getCollections);
CollectionRouter.delete(
  "/collection/delete/:id",
  CollectionController.deleteCollection
);
CollectionRouter.get(
  "/collection/:collectorId",
  CollectionController.getCollectionsById
);
