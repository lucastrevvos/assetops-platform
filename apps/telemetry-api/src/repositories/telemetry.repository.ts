import { TelemetryRecord } from "../types/telemetry";

export class TelemetryRepository {
    private readonly items: TelemetryRecord[] = []

    create(data: TelemetryRecord): TelemetryRecord{
        this.items.push(data)
        return data
    }

    findAll(): TelemetryRecord[] {
        return this.items
    }
}