import {
  CreateUserRepository,
  CreateUserDTO,
  GetUserByEmailRepository,
  CheckIfUserExistsByEmailRepository,
} from '@/data/protocols/db/user';
import { UserModel } from './models';
import { User } from '@/domain/models/user';

export class UserRepository
  implements
    CreateUserRepository,
    CheckIfUserExistsByEmailRepository,
    GetUserByEmailRepository
{
  async create(data: CreateUserDTO): Promise<User> {
    const user = new UserModel(data);
    await user.save();
    return user.toObject();
  }

  async checkIfExistsByEmail(email: string): Promise<boolean> {
    const exists = await UserModel.exists({ email });
    return !!exists;
  }

  async getByEmail(
    email: string,
    withPasswordHash: boolean = false
  ): Promise<User | null> {
    const userModel = UserModel.findOne({ email });

    if (withPasswordHash) {
      userModel.select('+passwordHash');
    }

    const user = await userModel.exec();

    return user ? (user.toObject() as User) : null;
  }
}
