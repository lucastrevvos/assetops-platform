import { TelemetryRecord } from "../types/telemetry";

export interface TelemetryRepository {
    create(data: TelemetryRecord): Promise<TelemetryRecord>;
    findAll(): Promise<TelemetryRecord[]>;
}