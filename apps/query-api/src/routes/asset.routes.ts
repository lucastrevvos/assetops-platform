import { Router } from "express";
import { listAssets } from "../controllers/asset.controller";

const assetRoutes = Router();

assetRoutes.get("/", listAssets);

export { assetRoutes };
