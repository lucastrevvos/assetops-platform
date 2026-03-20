import { PostgresTelemetryRepository } from "../repositories/postgres-telemetry.repository";
import { TelemetryService } from "./telemetry.service";

const telemetryRepository = new PostgresTelemetryRepository()

export const telemetryService = new TelemetryService(telemetryRepository)

