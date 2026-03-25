import { AssetView } from "@assetops/shared-types";
import { AssetRepository } from "../repositories/asset-repository";

export class AssetService {
  constructor(private readonly assetRepository: AssetRepository) {}

  async findAll(): Promise<AssetView[]> {
    return this.assetRepository.findAll();
  }
}
