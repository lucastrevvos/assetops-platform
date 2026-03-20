import { createApp } from "./app";
import { env } from "./config/env";
import { connectDatabase } from "./config/database";

async function bootstrap() {
  try {
    await connectDatabase();

    const app = createApp();

    app.listen(env.PORT, () => {
      console.log(`query-api running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start query-api:", error);
    process.exit(1);
  }
}

bootstrap();
