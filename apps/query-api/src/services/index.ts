import { AlertRepository } from "../repositories/alert-repository";
import { AssetRepository } from "../repositories/asset-repository";
import { TelemetryRepository } from "../repositories/telemetry-repository";
import { AlertService } from "./alert.service";
import { AssetService } from "./asset.service";
import { TelemetryService } from "./telemetry.service";

const telemetryRepository = new TelemetryRepository();
const assetRepository = new AssetRepository();
const alertRepository = new AlertRepository();

export const telemetryService = new TelemetryService(telemetryRepository);
export const assetService = new AssetService(assetRepository);
export const alertService = new AlertService(alertRepository);
