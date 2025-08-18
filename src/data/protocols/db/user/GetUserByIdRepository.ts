import { User } from '@/domain/models/user';

export interface GetUserByIdRepository {
  getById(userId: string, withPasswordHash?: boolean): Promise<User | null>;
}
