CREATE TABLE IF NOT EXISTS telemetry_readings (
    id UUID PRIMARY KEY,
    asset_id TEXT NOT NULL,
    temperature DOUBLE PRECISION NOT NULL,
    vibration DOUBLE PRECISION NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    received_at TIMESTAMPTZ NOT NULL 
);