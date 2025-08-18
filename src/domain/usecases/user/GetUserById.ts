import { User } from '@/domain/models/user';
import { UseCase } from '../UseCase';

export type GetUserByIdDTO = {
  userId: string;
  withPasswordHash?: boolean;
};

export interface GetUserById extends UseCase<GetUserByIdDTO, User | null> {}
