import { Test } from '@/models';

export interface IHealthRepository {
  check(numberOne: number, numberTwo: number): Promise<Test>;
}
