import { connectDatabase, db } from "./config/database";
import { env } from "./config/env";
import { connectConsumer, consumer } from "./config/kafka";
import { AlertRepository } from "./repositories/alert-repository";
import { AlertProcessorService } from "./services/alert-processor.service";
import { TelemetryReceivedEvent } from "./types/telemetry-event";

const alertRepository = new AlertRepository();
const alertProcessorService = new AlertProcessorService(alertRepository);

async function bootstrap() {
  try {
    await connectDatabase();
    await connectConsumer();

    console.log(`alert-worker started and waiting for telemetry events`);

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          if (!message.value) {
            return;
          }

          const rawValue = message.value.toString();
          const event = JSON.parse(rawValue) as TelemetryReceivedEvent;

          console.log(
            `Received message from ${topic}[${partition}] key=${message.key?.toString() ?? "null"}`,
          );

          await alertProcessorService.processEvent(event);
        } catch (error) {}
      },
    });
  } catch (error) {
    console.error("Failed to start alert-worker:", error);
    await db.end();
    process.exit(1);
  }
}

bootstrap();
