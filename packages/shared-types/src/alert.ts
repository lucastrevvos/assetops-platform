export type AlertType = "temperature" | "vibration";
export type AlertSeverity = "warning" | "critical";

export type AlertInput = {
  telemetryId: string;
  assetId: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
};

export type AlertRecord = {
  id: string;
  telemetryId: string;
  assetId: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  createdAt: string;
};

export type AlertView = {
  id: string;
  assetId: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  createdAt: string;
};
