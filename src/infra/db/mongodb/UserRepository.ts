import {
  CreateUserRepository,
  CreateUserDTO,
  GetUserByEmailRepository,
  CheckIfUserExistsByEmailRepository,
  GetUserByIdRepository,
  UpdateUserByIdRepository,
  UpdateUserAvatarByIdRepository,
} from '@/data/protocols/db/user';
import { UserModel } from './models';
import { User } from '@/domain/models/user';

export class UserRepository
  implements
    CreateUserRepository,
    CheckIfUserExistsByEmailRepository,
    GetUserByEmailRepository,
    GetUserByIdRepository,
    UpdateUserByIdRepository,
    UpdateUserAvatarByIdRepository
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

  async getById(
    userId: string,
    withPasswordHash: boolean = false
  ): Promise<User | null> {
    const userModel = UserModel.findById(userId);

    if (withPasswordHash) {
      userModel.select('+passwordHash');
    }

    const user = await userModel.exec();

    return user ? (user.toObject() as User) : null;
  }

  async updateById(
    userId: string,
    userData: { name: string }
  ): Promise<User | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: userData },
      { new: true }
    );

    return updatedUser ? (updatedUser.toObject() as User) : null;
  }

  async updateAvatarById(
    userId: string,
    avatarData: { variants: { size: string; url: string }[] }
  ): Promise<User | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: { avatar: avatarData } },
      { new: true }
    );

    return updatedUser ? (updatedUser.toObject() as User) : null;
  }
}
