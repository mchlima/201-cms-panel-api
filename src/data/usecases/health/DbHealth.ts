import { Health, HealthDTO } from '@/domain/usecases/health';
import { Test } from '@/domain/models/test';
import { HealthRepository } from '@/data/protocols/db/health';

export class DbHealth implements Health {
  constructor(private healthRepository: HealthRepository) {}

  async execute(data: HealthDTO): Promise<Test> {
    const { numberOne, numberTwo } = data;
    return await this.healthRepository.check(numberOne, numberTwo);
  }
}
