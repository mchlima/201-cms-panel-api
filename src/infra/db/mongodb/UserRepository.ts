import {
  CreateUserRepository,
  CreateUserDTO,
  CheckIfUserExistsRepository,
  CheckIfUserExistsDTO,
  GetUserByEmailWithPasswordHashRepository,
  GetUserByEmailWithPasswordHashDTO,
} from '@/data/protocols/db/user';
import { UserModel } from './models';
import { User } from '@/domain/models/user';

export class UserRepository
  implements
    CreateUserRepository,
    CheckIfUserExistsRepository,
    GetUserByEmailWithPasswordHashRepository
{
  async create(data: CreateUserDTO): Promise<User> {
    const user = new UserModel(data);
    await user.save();
    return user.toObject();
  }

  async checkIfExists(data: CheckIfUserExistsDTO): Promise<boolean> {
    const exists = await UserModel.exists({ email: data.email });
    return !!exists;
  }

  async getByEmailWithPasswordHash(
    data: GetUserByEmailWithPasswordHashDTO
  ): Promise<User | null> {
    const user = await UserModel.findOne({ email: data.email }).select(
      '+passwordHash'
    );
    return user ? (user.toObject() as User) : null;
  }
}
