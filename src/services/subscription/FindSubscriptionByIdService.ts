import { ISubscriptionRepository } from '@/repositories/subscription';
import {
  FindSubscriptionByIdDTO,
  IFindSubscriptionByIdService,
} from './IFindSubscriptionByIdService';
import { ISubscription } from '@/models';

export class FindSubscriptionByIdService
  implements IFindSubscriptionByIdService
{
  constructor(private subscriptionRepository: ISubscriptionRepository) {}

  async execute(data: FindSubscriptionByIdDTO): Promise<ISubscription | null> {
    return this.subscriptionRepository.findSubscriptionById(
      data.userId,
      data.subscriptionId!
    );
  }
}
