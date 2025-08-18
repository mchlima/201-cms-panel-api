import { GetUserByIdUseCase, SignInUserUseCase } from '@/data/usecases/user';
import { UserRepository } from '@/infra/db/mongodb';
import { GetCurrentUserController } from '@/presentation/controllers/user';
import { Controller } from '@/presentation/protocols';

export class GetCurrentUserControllerFactory {
  static make(): Controller {
    const userRepository = new UserRepository();
    const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
    const getCurrentUserController = new GetCurrentUserController(
      getUserByIdUseCase
    );
    return getCurrentUserController;
  }
}
