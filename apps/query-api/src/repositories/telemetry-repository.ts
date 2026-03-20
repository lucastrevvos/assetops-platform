import { db } from "../config/database";
import { TelemetryRecord } from "../types/telemetry";

type TelemetryRow = {
  id: string;
  asset_id: string;
  temperature: number;
  vibration: number;
  timestamp: string;
  received_at: string;
};

export class TelemetryRepository {
  async findAll(): Promise<TelemetryRecord[]> {
    const query = `
      SELECT id, asset_id, temperature, vibration, timestamp, received_at
      FROM telemetry_readings
      ORDER BY received_at DESC
    `;

    const result = await db.query<TelemetryRow>(query);

    return result.rows.map((row) => ({
      id: row.id,
      assetId: row.asset_id,
      temperature: Number(row.temperature),
      vibration: Number(row.vibration),
      timestamp: new Date(row.timestamp).toISOString(),
      receivedAt: new Date(row.received_at).toISOString(),
    }));
  }
}
