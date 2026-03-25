export type TelemetryInput = {
  assetId: string;
  temperature: number;
  vibration: number;
  timestamp: string;
};

export type TelemetryRecord = {
  id: string;
  assetId: string;
  temperature: number;
  vibration: number;
  timestamp: string;
  receivedAt: string;
};

export type TelemetryToProcess = TelemetryRecord & {
  processedAt: string | null;
};
