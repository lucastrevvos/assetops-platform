import {z} from 'zod';

export const telemetrySchema = z.object({
    assetId: z.string().min(1, "Asset ID is required"),
    temperature: z.number(),
    vibration: z.number(),
    timestamp: z.iso.datetime("timestamp must be a valid ISO datetime")});

export type TelemetrySchema = z.infer<typeof telemetrySchema>;