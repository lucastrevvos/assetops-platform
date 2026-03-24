import "dotenv/config";

function getEnv(name: string, defaultValue?: string): string {
  const value = process.env[name] ?? defaultValue;

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const env = {
  PORT: Number(getEnv("PORT", "3333")),
  NODE_ENV: getEnv("NODE_ENV", "development"),
  DATABASE_URL: getEnv("DATABASE_URL"),
  KAFKA_BROKERS: getEnv("KAFKA_BROKERS", "localhost:9092")
    .split(",")
    .map((broker) => broker.trim()),
  KAFKA_CLIENT_ID: getEnv("KAFKA_CLIENT_ID", "telemetry-api"),
  KAFKA_TOPIC_TELEMETRY: getEnv("KAFKA_TOPIC_TELEMETRY", "telemetry.received"),
};
