import { TelemetryRecord } from "@assetops/shared-types";
import { TelemetryRepository } from "../repositories/telemetry-repository";

export class TelemetryService {
  constructor(private readonly telemetryRepository: TelemetryRepository) {}

  async findAll(): Promise<TelemetryRecord[]> {
    return this.telemetryRepository.findAll();
  }
}
