import { ISubscription } from '@/models';
import { IService } from '../IService';

export type FindSubscriptionByIdDTO = {
  userId: ISubscription['userId'];
  subscriptionId: ISubscription['_id'];
};

export interface IFindSubscriptionByIdService
  extends IService<FindSubscriptionByIdDTO, ISubscription | null> {}
