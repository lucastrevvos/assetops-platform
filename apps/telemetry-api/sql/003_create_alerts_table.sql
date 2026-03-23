CREATE TABLE IF NOT EXISTS alerts (
  id UUID PRIMARY KEY,
  telemetry_id UUID NOT NULL UNIQUE,
  asset_id TEXT NOT NULL,
  type TEXT NOT NULL,
  severity TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL
);