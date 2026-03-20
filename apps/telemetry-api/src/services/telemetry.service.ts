import { randomUUID } from "node:crypto";
import { TelemetryRepository } from "../repositories/telemetry-repository";
import { TelemetryInput, TelemetryRecord } from "../types/telemetry";
import { AppError } from "../errors/app-error";

export class TelemetryService {
    constructor(private readonly telemetryRepository: TelemetryRepository){}

    async create(input: TelemetryInput): Promise<TelemetryRecord> {

        if(input.temperature < 0) {
            throw new AppError('Temperature cannot be negative', 400)
        }

        if(input.vibration < 0){
            throw new AppError('Vibration cannot be negative', 400)
        }

        const telemetryRecord: TelemetryRecord = {
            id: randomUUID(),
            assetId: input.assetId,
            temperature: input.temperature,
            vibration: input.vibration,
            timestamp: input.timestamp,
            receivedAt: new Date().toISOString()
        };
        
        return await this.telemetryRepository.create(telemetryRecord)
    }

    async findAll(): Promise<TelemetryRecord[]> {
        return await this.telemetryRepository.findAll()
    }
}