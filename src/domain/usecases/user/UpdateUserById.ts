import { User } from '@/domain/models/user';
import { UseCase } from '../UseCase';
import { _ZodBigInt } from 'zod/v4';

export type UpdateUserByIdDTO = {
  userId: string;
  userData: {
    name: string;
  };
};

export interface UpdateUserById
  extends UseCase<UpdateUserByIdDTO, User | null> {}
