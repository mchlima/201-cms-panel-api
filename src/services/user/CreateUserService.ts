import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { IUserRepository } from '@/repositories/user';
import { ISubscription, User } from '@/models';
import { ICreateUserService } from '.';
import { AppError, DependencyError } from '@/errors';
import { ISubscriptionRepository } from '@/repositories/subscription';
import { IMailService } from '@/providers/mail';
import Logger from '@/utils/Logger';

type CreateUserDTO = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  document: string;
  documentType: 'CPF' | 'RUT';
  countryCode: 'BR' | 'CL';
};

export class CreateUserService implements ICreateUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly mailer: IMailService
  ) {}

  async execute(
    data: CreateUserDTO
  ): Promise<{ accessToken: string; user: User }> {
    let user: User | null = null;
    let subscription: ISubscription | null = null;

    user = await this.userRepository.findUserByDocumentAndEmail(
      data.document,
      data.documentType,
      data.email
    );

    if (!user) {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      user = await this.userRepository.createUser({
        ...data,
        password: hashedPassword,
      });
    } else {
      subscription =
        await this.subscriptionRepository.findActiveSubscriptionByUserId(
          user._id!
        );

      if (subscription) {
        throw new AppError(
          'USER_ALREADY_REGISTERED',
          'Usuário já cadastrado com este documento e e-mail.',
          409
        );
      }
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1d',
      }
    );

    try {
      await this.mailer.send({
        to: [user.email],
        templateId: '3yxj6lj6vdq4do2r',
        personalization: [
          {
            email: user.email,
            data: {
              firstName: user.firstName,
              lastName: user.lastName,
            },
          },
        ],
      });
    } catch (error) {
      const dependencyError = new DependencyError(
        'Error sending email after subscription creation',
        'EMAIL_ERROR',
        500,
        { userId: user._id }
      );

      Logger.error(
        dependencyError,
        'Error sending email to user after account creation'
      );
    }
    return { accessToken, user };
  }
}
