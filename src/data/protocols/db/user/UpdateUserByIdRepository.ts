import { User } from '@/domain/models/user';

export interface UpdateUserByIdRepository {
  updateById(userId: string, userData: { name: string }): Promise<User | null>;
}
