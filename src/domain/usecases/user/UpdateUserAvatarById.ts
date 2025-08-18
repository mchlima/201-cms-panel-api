import { User } from '@/domain/models/user';
import { UseCase } from '../UseCase';

export type UpdateUserAvatarByIdDTO = {
  userId: string;
  file: Buffer;
  originalName: string;
  mimetype: string;
};

export interface UpdateUserAvatarById
  extends UseCase<UpdateUserAvatarByIdDTO, User | null> {}
