import { IPlan } from '@/models';
import { IService } from '../IService';

export type FindActivePlansDTO = {
  countryCode: IPlan['countryCode'];
};

export interface IFindActivePlansService
  extends IService<FindActivePlansDTO, IPlan[]> {}
