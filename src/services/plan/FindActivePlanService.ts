import { IPlanRepository } from '@/repositories/plans';
import {
  FindActivePlansDTO,
  IFindActivePlansService,
} from './IFindActivePlansService';
import { IPlan } from '@/models';

export class FindActivePlansService implements IFindActivePlansService {
  constructor(private planRepository: IPlanRepository) {}

  async execute(data: FindActivePlansDTO): Promise<IPlan[]> {
    const { countryCode } = data;
    return this.planRepository.findActivePlans(countryCode);
  }
}
