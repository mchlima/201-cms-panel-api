import { User } from '@/domain/models/user';

export interface UpdateUserAvatarByIdRepository {
  updateAvatarById(
    userId: string,
    avatarData: {
      avatar: {
        urls: {
          original: string;
          small: string;
          medium: string;
          large: string;
        };
      };
    }
  ): Promise<User | null>;
}
