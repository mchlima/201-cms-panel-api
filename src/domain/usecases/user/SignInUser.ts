import { UseCase } from '../';

export type SignInUserDTO = {
  email: string;
  password: string;
};

export interface SignInUser extends UseCase<SignInUserDTO, string> {}
