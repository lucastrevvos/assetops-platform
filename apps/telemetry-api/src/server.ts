import { createApp } from "./app";
import { connectDatabase } from "./config/database";
import { env } from "./config/env";
import { connectProducer } from "./config/kafka";

async function bootstrap() {
  try {
    await connectDatabase();
    await connectProducer();

    const app = createApp();

    app.listen(env.PORT, () => {
      console.log(`telemetry-api running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start telemetry-api:", error);
    process.exit(1);
  }
}

bootstrap();
