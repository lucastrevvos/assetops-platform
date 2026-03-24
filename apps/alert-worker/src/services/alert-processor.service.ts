import { randomUUID } from "node:crypto";
import { AlertInput, AlertRecord } from "../types/alert";
import { TelemetryRepository } from "../repositories/telemetry-repository";
import { AlertRepository } from "../repositories/alert-repository";
import { TelemetryToProcess } from "../types/telemetry";
import { TelemetryReceivedEvent } from "../types/telemetry-event";

export class AlertProcessorService {
  constructor(private readonly alertRepository: AlertRepository) {}

  async processEvent(event: TelemetryReceivedEvent): Promise<void> {
    const item = event.payload;

    if (item.temperature > 90) {
      const created = await this.alertRepository.create({
        telemetryId: item.id,
        assetId: item.assetId,
        type: "temperature",
        severity: "critical",
        message: "Temperature above critical threshold",
      });

      if (created) {
        console.log(
          `Critical temperature alert created for asset ${item.assetId}`,
        );
      }

      return;
    }

    if (item.vibration > 10) {
      const created = await this.alertRepository.create({
        telemetryId: item.id,
        assetId: item.assetId,
        type: "vibration",
        severity: "warning",
        message: "vibration above warning threshold",
      });

      if (created) {
        console.log(
          `Vibration warning alert created for asset ${item.assetId}`,
        );
      }
    }
  }
}
