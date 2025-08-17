import { User } from '@/domain/models/user';

export type GetUserByEmailDTO = {
  email: string;
};

export interface GetUserByEmailRepository {
  getByEmail(data: GetUserByEmailDTO): Promise<User | null>;
}
