export type TelemetryReceivedEvent = {
  eventName: "telemetry.received";
  occurredAt: string;
  payload: {
    id: string;
    assetId: string;
    temperature: number;
    vibration: number;
    timestamp: string;
    receivedAt: string;
  };
};
