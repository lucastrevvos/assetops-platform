import { PostgresTelemetryRepository } from "../repositories/postgres-telemetry.repository";
import { TelemetryEventPublisher } from "./telemetry-event.publisher";
import { TelemetryService } from "./telemetry.service";

const telemetryRepository = new PostgresTelemetryRepository();
const telemetryEventPublisher = new TelemetryEventPublisher();

export const telemetryService = new TelemetryService(
  telemetryRepository,
  telemetryEventPublisher,
);
