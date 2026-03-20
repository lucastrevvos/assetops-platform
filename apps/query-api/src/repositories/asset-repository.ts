import { db } from "../config/database";
import { AssetStatus, AssetView } from "../types/asset";

type AssetRow = {
  id: string;
  name: string;
  last_temperature: number;
  last_vibration: number;
  last_reading_at: string;
};

export class AssetRepository {
  async findAll(): Promise<AssetView[]> {
    const query = `
      SELECT
        latest.asset_id AS id,
        latest.asset_id AS name,
        latest.temperature AS last_temperature,
        latest.vibration AS last_vibration,
        latest.timestamp AS last_reading_at
      FROM (
        SELECT DISTINCT ON (asset_id)
          asset_id,
          temperature,
          vibration,
          timestamp
        FROM telemetry_readings
        ORDER BY asset_id, timestamp DESC
      ) AS latest
      ORDER BY latest.asset_id ASC
    `;

    const result = await db.query<AssetRow>(query);

    return result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      status: this.getStatus(
        Number(row.last_temperature),
        Number(row.last_vibration),
      ),
      lastTemperature: Number(row.last_temperature),
      lastVibration: Number(row.last_vibration),
      lastReadingAt: new Date(row.last_reading_at).toISOString(),
    }));
  }

  private getStatus(temperature: number, vibration: number): AssetStatus {
    if (temperature > 90) return "critical";
    if (vibration > 10) return "warning";
    return "healthy";
  }
}
