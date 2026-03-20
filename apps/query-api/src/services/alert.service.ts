import { AlertRepository } from "../repositories/alert-repository";
import { AlertView } from "../types/alert";

export class AlertService {
  constructor(private readonly alertRepository: AlertRepository) {}

  async findAll(): Promise<AlertView[]> {
    return this.alertRepository.findAll();
  }
}
