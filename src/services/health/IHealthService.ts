import { Test } from '@/models';
import { IService } from '../IService';

export type IHealthDTO = {
  numberOne: number;
  numberTwo: number;
};

export interface IHealthService extends IService<IHealthDTO, Test> {}
