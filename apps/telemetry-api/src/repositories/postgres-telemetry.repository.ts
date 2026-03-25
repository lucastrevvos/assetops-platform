import { TelemetryRecord } from "@assetops/shared-types";
import { db } from "../config/database";

import { TelemetryRepository } from "./telemetry-repository";

type TelemetryRow = {
  id: string;
  asset_id: string;
  temperature: number;
  vibration: number;
  timestamp: string;
  received_at: string;
};

export class PostgresTelemetryRepository implements TelemetryRepository {
  async create(data: TelemetryRecord): Promise<TelemetryRecord> {
    const query = `
      INSERT INTO telemetry_readings (
        id,
        asset_id,
        temperature,
        vibration,
        timestamp,
        received_at
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, asset_id, temperature, vibration, timestamp, received_at
    `;

    const values = [
      data.id,
      data.assetId,
      data.temperature,
      data.vibration,
      data.timestamp,
      data.receivedAt,
    ];

    const result = await db.query<TelemetryRow>(query, values);
    return this.mapRowToTelemetry(result.rows[0]);
  }

  async findAll(): Promise<TelemetryRecord[]> {
    const query = `
            SELECT id, asset_id, temperature, vibration, timestamp, received_at
            FROM telemetry_readings
            ORDER BY received_at DESC
        `;

    const result = await db.query<TelemetryRow>(query);

    return result.rows.map(this.mapRowToTelemetry);
  }

  private mapRowToTelemetry(row: TelemetryRow): TelemetryRecord {
    return {
      id: row.id,
      assetId: row.asset_id,
      temperature: Number(row.temperature),
      vibration: Number(row.vibration),
      timestamp: new Date(row.timestamp).toISOString(),
      receivedAt: new Date(row.received_at).toISOString(),
    };
  }
}
