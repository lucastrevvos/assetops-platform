import { AssetRepository } from "../repositories/asset-repository";
import { AssetView } from "../types/asset";

export class AssetService {
  constructor(private readonly assetRepository: AssetRepository) {}

  async findAll(): Promise<AssetView[]> {
    return this.assetRepository.findAll();
  }
}
