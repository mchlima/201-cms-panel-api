import { ISubscription } from '@/models';
import { IService } from '../IService';

export type CreateSubscriptionDTO = {
  userId: string;
  planId: string;
  card?: {
    token: string;
    holderName: string;
    last4Digits: string;
    expirationMonth: number;
    expirationYear: number;
    brand: string;
  };
};

export interface ICreateSubscriptionService
  extends IService<CreateSubscriptionDTO, ISubscription> {}
