import { randomUUID } from "node:crypto";
import { TelemetryRepository } from "../repositories/telemetry-repository";
import { TelemetryInput, TelemetryRecord } from "../types/telemetry";
import { AppError } from "../errors/app-error";
import { TelemetryEventPublisher } from "./telemetry-event.publisher";

export class TelemetryService {
  constructor(
    private readonly telemetryRepository: TelemetryRepository,
    private readonly telemetryEventPublisher: TelemetryEventPublisher,
  ) {}

  async create(input: TelemetryInput): Promise<TelemetryRecord> {
    if (input.temperature < 0) {
      throw new AppError("Temperature cannot be negative", 400);
    }

    if (input.vibration < 0) {
      throw new AppError("Vibration cannot be negative", 400);
    }

    const telemetryRecord: TelemetryRecord = {
      id: randomUUID(),
      assetId: input.assetId,
      temperature: input.temperature,
      vibration: input.vibration,
      timestamp: input.timestamp,
      receivedAt: new Date().toISOString(),
    };

    const created = await this.telemetryRepository.create(telemetryRecord);

    await this.telemetryEventPublisher.publishTelemetryReceived(created);

    return created;
  }

  async findAll(): Promise<TelemetryRecord[]> {
    return await this.telemetryRepository.findAll();
  }
}
