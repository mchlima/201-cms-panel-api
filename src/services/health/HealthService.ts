import { IHealthRepository } from '@/repositories/health';
import { IHealthDTO, IHealthService } from './IHealthService';
import { Test } from '@/models';

export class HealthService implements IHealthService {
  constructor(private healthRepository: IHealthRepository) {}

  async execute(data: IHealthDTO): Promise<Test> {
    const { numberOne, numberTwo } = data;
    return await this.healthRepository.check(numberOne, numberTwo);
  }
}
