import { env } from "../config/env";
import { producer } from "../config/kafka";
import { TelemetryRecord } from "../types/telemetry";
import { TelemetryReceivedEvent } from "../types/telemetry-event";

export class TelemetryEventPublisher {
  async publishTelemetryReceived(data: TelemetryRecord): Promise<void> {
    const event: TelemetryReceivedEvent = {
      eventName: "telemetry.received",
      occurredAt: new Date().toISOString(),
      payload: {
        id: data.id,
        assetId: data.assetId,
        temperature: data.temperature,
        vibration: data.vibration,
        timestamp: data.timestamp,
        receivedAt: data.receivedAt,
      },
    };

    await producer.send({
      topic: env.KAFKA_TOPIC_TELEMETRY,
      messages: [
        {
          key: data.assetId,
          value: JSON.stringify(event),
        },
      ],
    });
  }
}
