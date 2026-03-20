import { createApp } from "./app";
import { connectDatabase } from "./config/database";
import { env } from "./config/env";

async function bootstrap() {
  try {
    await connectDatabase();

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
