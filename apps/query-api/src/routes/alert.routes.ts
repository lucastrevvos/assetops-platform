import { Router } from "express";
import { listAlerts } from "../controllers/alert.controller";

const alertRoutes = Router();

alertRoutes.get("/", listAlerts);

export { alertRoutes };
