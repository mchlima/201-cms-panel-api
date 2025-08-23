import { User } from '@/domain/models/user';

export interface UpdateUserAvatarByIdRepository {
  updateAvatarById(
    userId: string,
    avatar: {
      variants: { size: string; url: string }[];
    }
  ): Promise<User | null>;
}
