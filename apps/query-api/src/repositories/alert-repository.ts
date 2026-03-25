import { AlertView } from "@assetops/shared-types";
import { db } from "../config/database";

type AlertRow = {
  id: string;
  asset_id: string;
  type: "temperature" | "vibration";
  severity: "warning" | "critical";
  message: string;
  created_at: string;
};

export class AlertRepository {
  async findAll(): Promise<AlertView[]> {
    const query = `
      SELECT id, asset_id, type, severity, message, created_at
      FROM alerts
      ORDER BY created_at DESC
    `;

    const result = await db.query<AlertRow>(query);

    return result.rows.map((row) => ({
      id: row.id,
      assetId: row.asset_id,
      type: row.type,
      severity: row.severity,
      message: row.message,
      createdAt: new Date(row.created_at).toISOString(),
    }));
  }
}
