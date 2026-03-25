export type AssetStatus = "healthy" | "warning" | "critical";

export type AssetView = {
  id: string;
  name: string;
  status: AssetStatus;
  lastTemperature: number;
  lastVibration: number;
  lastReadingAt: string;
};
