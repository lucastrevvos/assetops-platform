import "dotenv/config";

function getEnv(name: string, defaultValue?: string): string {
  const value = process.env[name] ?? defaultValue;

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const env = {
  NODE_ENV: getEnv("NODE_ENV", "development"),
  DATABASE_URL: getEnv("DATABASE_URL"),
  WORKER_INTERVAL_MS: Number(getEnv("WORKER_INTERVAL_MS", "5000")),
};
