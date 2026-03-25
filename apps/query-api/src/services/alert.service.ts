import { AlertView } from "@assetops/shared-types";
import { AlertRepository } from "../repositories/alert-repository";

export class AlertService {
  constructor(private readonly alertRepository: AlertRepository) {}

  async findAll(): Promise<AlertView[]> {
    return this.alertRepository.findAll();
  }
}
