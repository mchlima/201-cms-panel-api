import { Test } from '@/domain/models/test';

export interface HealthRepository {
  check(numberOne: number, numberTwo: number): Promise<Test>;
}
