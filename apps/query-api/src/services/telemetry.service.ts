import { TelemetryRepository } from "../repositories/telemetry-repository";
import { TelemetryRecord } from "../types/telemetry";

export class TelemetryService {
  constructor(private readonly telemetryRepository: TelemetryRepository) {}

  async findAll(): Promise<TelemetryRecord[]> {
    return this.telemetryRepository.findAll();
  }
}
