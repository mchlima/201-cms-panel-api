import { UseCase } from '../';
import { User } from '@/domain/models/user';

export type RegisterUserDTO = {
  tenant: {
    name: string;
    slug: string;
    sellerId: string;
  };
  user: {
    name: string;
    email: string;
    password: string;
  };
};

export interface RegisterUser extends UseCase<RegisterUserDTO, User> {}
