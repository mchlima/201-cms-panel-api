import { Test } from '@/domain/models/test';
import { UseCase } from '../';

export type HealthDTO = {
  numberOne: number;
  numberTwo: number;
};

export interface Health extends UseCase<HealthDTO, Test> {}
