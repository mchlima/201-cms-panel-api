import { HealthService } from '@/services/health';
import { HealthController } from './HealthController';
import { HealthRepository } from '@/repositories/health';

export class HealthControllerFactory {
  static create(): HealthController {
    const healthRepository = new HealthRepository();
    const healthService = new HealthService(healthRepository);
    const healthController = new HealthController(healthService);
    return healthController;
  }
}
