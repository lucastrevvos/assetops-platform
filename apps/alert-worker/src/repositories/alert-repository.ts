import { randomUUID } from "crypto";
import { AlertInput, AlertRecord } from "../types/alert";
import { db } from "../config/database";

type AlertRow = {
  id: string;
  telemetry_id: string;
  asset_id: string;
  type: "temperature" | "vibration";
  severity: "warning" | "critical";
  message: string;
  created_at: string;
};

export class AlertRepository {
  async create(input: AlertInput): Promise<AlertRecord> {
    const id = randomUUID();
    const createdAt = new Date().toISOString();

    const query = `
        INSERT INTO alerts (
            id,
            telemetry_id,
            asset_id,
            type,
            severity,
            message,
            created_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, telemetry_id, asset_id, type, severity, message, created_at
      `;

    const values = [
      id,
      input.telemetryId,
      input.assetId,
      input.type,
      input.severity,
      input.message,
      createdAt,
    ];

    const result = await db.query<AlertRow>(query, values);
    const row = result.rows[0];

    return {
      id: row.id,
      telemetryId: row.telemetry_id,
      assetId: row.asset_id,
      type: row.type,
      severity: row.severity,
      message: row.message,
      createdAt: new Date(row.created_at).toISOString(),
    };
  }
}
