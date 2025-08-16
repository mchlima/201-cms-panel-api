import { UseCase } from '../';
import { User } from '@/domain/models/user';

export type RegisterUserDTO = {
  sellerId: string;
  tenant: {
    name: string;
    slug: string;
  };
  user: {
    name: string;
    email: string;
    password: string;
  };
};

export interface RegisterUser extends UseCase<RegisterUserDTO, User> {}
