export type UserRole = 'admin' | 'editor' | 'viewer';

export type User = {
  _id?: string;
  tenantId: string;
  name: string;
  email: string;
  passwordHash?: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
};
