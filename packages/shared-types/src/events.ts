import { TelemetryRecord } from "./telemetry";

export type TelemetryReceivedEvent = {
  eventName: "telemetry.received";
  occurredAt: string;
  payload: TelemetryRecord;
};
