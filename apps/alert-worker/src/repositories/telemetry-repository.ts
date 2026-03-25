import { TelemetryToProcess } from "@assetops/shared-types";
import { db } from "../config/database";

type TelemetryRow = {
  id: string;
  asset_id: string;
  temperature: number;
  vibration: number;
  timestamp: string;
  received_at: string;
  processed_at: string | null;
};

export class TelemetryRepository {
  async findUnprocessed(limit = 50): Promise<TelemetryToProcess[]> {
    const query = `
            SELECT id, asset_id, temperature, vibration, timestamp, received_at, processed_at
            FROM telemetry_readings
            WHERE processed_at IS NULL
            ORDER BY received_at ASC
            LIMIT $1
        `;

    const result = await db.query<TelemetryRow>(query, [limit]);

    return result.rows.map((row) => ({
      id: row.id,
      assetId: row.asset_id,
      temperature: Number(row.temperature),
      vibration: Number(row.vibration),
      timestamp: new Date(row.timestamp).toISOString(),
      receivedAt: new Date(row.received_at).toISOString(),
      processedAt: row.processed_at
        ? new Date(row.processed_at).toISOString()
        : null,
    }));
  }

  async markAsProcessed(telemetryId: string): Promise<void> {
    const query = `
            UPDATE telemetry_readings
            SET processed_at = NOW()
            WHERE id = $1
        `;

    await db.query(query, [telemetryId]);
  }
}
