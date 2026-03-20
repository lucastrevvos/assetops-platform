import { Router } from "express";
import { listTelemetry } from "../controllers/telemetry.controller";

const telemetryRoutes = Router();

telemetryRoutes.get("/", listTelemetry);

export { telemetryRoutes };
