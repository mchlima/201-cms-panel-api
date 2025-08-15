import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { ISignInUserService, SignInUserDTO } from '.';
import { IUserRepository } from '@/repositories/user';
import { User } from '@/models';
import { UnauthorizedError } from '@/errors';

export class SignInUserService implements ISignInUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: SignInUserDTO): Promise<{ accessToken: string }> {
    console.log('Executing SignInUserService with data:', data);
    const user = await this.userRepository.findUserByEmail(data.email);
    console.log('User found:', user);

    if (!user) {
      throw new UnauthorizedError(
        'Invalid email or password',
        'INVALID_CREDENTIALS',
        401
      );
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      user?.password!
    );

    if (!isPasswordValid) {
      throw new UnauthorizedError(
        'Invalid email or password',
        'INVALID_CREDENTIALS',
        401
      );
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1d',
      }
    );

    return { accessToken };
  }
}
