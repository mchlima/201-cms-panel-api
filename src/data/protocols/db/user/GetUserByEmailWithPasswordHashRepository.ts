import { User } from '@/domain/models/user';

export type GetUserByEmailWithPasswordHashDTO = {
  email: string;
};

export interface GetUserByEmailWithPasswordHashRepository {
  getByEmailWithPasswordHash(
    data: GetUserByEmailWithPasswordHashDTO
  ): Promise<User | null>;
}
