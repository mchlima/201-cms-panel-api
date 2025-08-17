import { User } from '@/domain/models/user';

export type GetUserByEmailDTO = {
  email: string;
};

export interface GetUserByEmailRepository {
  get(data: GetUserByEmailDTO): Promise<User>;
}
