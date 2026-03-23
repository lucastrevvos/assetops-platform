export type TelemetryToProcess = {
  id: string;
  assetId: string;
  temperature: number;
  vibration: number;
  timestamp: string;
  receivedAt: string;
  processedAt: string | null;
};
