import { UpdateUserByIdUseCase } from '@/data/usecases/user';
import { UserRepository } from '@/infra/db/mongodb';
import { UpdateCurrentUserController } from '@/presentation/controllers/user';
import { Controller } from '@/presentation/protocols';

export class UpdateCurrentUserControllerFactory {
  static make(): Controller {
    const userRepository = new UserRepository();
    const updateUserByIdUseCase = new UpdateUserByIdUseCase(userRepository);
    const updateCurrentUserController = new UpdateCurrentUserController(
      updateUserByIdUseCase
    );
    return updateCurrentUserController;
  }
}
