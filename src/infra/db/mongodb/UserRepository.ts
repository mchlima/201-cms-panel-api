import {
  CreateUserRepository,
  CreateUserDTO,
  CheckIfUserExistsRepository,
  CheckIfUserExistsDTO,
} from '@/data/protocols/db/user';
import { UserModel } from './models';
import { User } from '@/domain/models/user';

export class UserRepository
  implements CreateUserRepository, CheckIfUserExistsRepository
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
}
