import { IService } from '..';

export type SignInUserDTO = {
  email: string;
  password: string;
};

export interface ISignInUserService
  extends IService<SignInUserDTO, { accessToken: string }> {}
