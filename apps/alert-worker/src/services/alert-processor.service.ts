import { randomUUID } from "node:crypto";
import { AlertInput, AlertRecord } from "../types/alert";
import { TelemetryRepository } from "../repositories/telemetry-repository";
import { AlertRepository } from "../repositories/alert-repository";
import { TelemetryToProcess } from "../types/telemetry";

export class AlertProcessorService {
  constructor(
    private readonly telemetryRepository: TelemetryRepository,
    private readonly alertRepository: AlertRepository,
  ) {}

  async processBatch(): Promise<void> {
    const items = await this.telemetryRepository.findUnprocessed();

    if (items.length === 0) {
      console.log("No unprocessed telemetry found.");
      return;
    }

    console.log(`Processing ${items.length} telemetry items(s)`);

    for (const item of items) {
      await this.processTelemetry(item);
      await this.telemetryRepository.markAsProcessed(item.id);
    }
  }

  private async processTelemetry(item: TelemetryToProcess): Promise<void> {
    if (item.temperature > 90) {
      await this.alertRepository.create({
        telemetryId: item.id,
        assetId: item.assetId,
        type: "temperature",
        severity: "critical",
        message: "Temperature above critical threshold",
      });

      console.log(
        `Critical temperature alert created for asset ${item.assetId}`,
      );

      return;
    }

    if (item.vibration > 10) {
      await this.alertRepository.create({
        telemetryId: item.id,
        assetId: item.assetId,
        type: "vibration",
        severity: "warning",
        message: "vibration above warning threshold",
      });

      console.log(`Vibration warning alert created for asset ${item.assetId}`);
    }
  }
}
