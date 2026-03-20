export type AlertView = {
  id: string;
  assetId: string;
  type: "temperature" | "vibration";
  severity: "warning" | "critical";
  message: string;
  createdAt: string;
};
