import { Router } from "express";
import { validateBody } from "../middlewares/validate-body";
import { telemetrySchema } from "../schemas/telemetry.schema";
import { createTelemetry, listTelemetry } from "../controllers/telemetry.controller";


const telemetryRoutes = Router();

telemetryRoutes.post('/', validateBody(telemetrySchema), createTelemetry)
telemetryRoutes.get('/', listTelemetry)

export { telemetryRoutes }