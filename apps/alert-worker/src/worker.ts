import { connectDatabase, db } from "./config/database";
import { env } from "./config/env";
import { AlertRepository } from "./repositories/alert-repository";
import { TelemetryRepository } from "./repositories/telemetry-repository";
import { AlertProcessorService } from "./services/alert-processor.service";

const telemetryRepository = new TelemetryRepository();
const alertRepository = new AlertRepository();
const alertProcessorService = new AlertProcessorService(
  telemetryRepository,
  alertRepository,
);

async function runCycle() {
  try {
    await alertProcessorService.processBatch();
  } catch (error) {
    console.error("Error while processing telemetry batch:", error);
  }
}

async function bootstrap() {
  try {
    await connectDatabase();

    console.log(
      `alert-worker started. Polling every ${env.WORKER_INTERVAL_MS}ms`,
    );

    await runCycle();

    setInterval(async () => {
      await runCycle();
    }, env.WORKER_INTERVAL_MS);
  } catch (error) {
    console.error("Failed to start alert-worker:", error);
    await db.end();
    process.exit(1);
  }
}

bootstrap();
