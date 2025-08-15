import { User } from '@/models';
import { IService } from '../IService';

export type CreateUserDTO = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  document: string;
  documentType: 'CPF' | 'RUT';
  countryCode: 'BR' | 'CL';
};

export interface ICreateUserService
  extends IService<CreateUserDTO, { accessToken: string; user: User }> {}
