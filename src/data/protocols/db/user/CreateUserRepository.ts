import { User, UserRole } from '@/domain/models/user';

export type CreateUserDTO = {
  tenantId: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
};

export interface CreateUserRepository {
  create(data: CreateUserDTO): Promise<User>;
}
