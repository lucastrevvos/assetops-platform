export type AlertInput = {
  telemetryId: string;
  assetId: string;
  type: "temperature" | "vibration";
  severity: "warning" | "critical";
  message: string;
};

export type AlertRecord = {
  id: string;
  telemetryId: string;
  assetId: string;
  type: "temperature" | "vibration";
  severity: "warning" | "critical";
  message: string;
  createdAt: string;
};
