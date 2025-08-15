import { HealthController } from '@/presentation/controllers/health';
import { HealthRepository } from '@/infra/db/mongodb';
import { DbHealth } from '@/data/usecases/health';

export class HealthControllerFactory {
  static create(): HealthController {
    const healthRepository = new HealthRepository();
    const health = new DbHealth(healthRepository);
    const healthController = new HealthController(health);
    return healthController;
  }
}
