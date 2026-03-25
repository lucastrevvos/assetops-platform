import { TelemetryRecord } from "@assetops/shared-types";

export interface TelemetryRepository {
  create(data: TelemetryRecord): Promise<TelemetryRecord>;
  findAll(): Promise<TelemetryRecord[]>;
}
