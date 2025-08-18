import { User } from '@/domain/models/user';

export interface GetUserByEmailRepository {
  getByEmail(email: string, withPasswordHash?: boolean): Promise<User | null>;
}
