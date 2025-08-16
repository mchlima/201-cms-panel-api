import { RegisterUserUseCase } from '@/data/usecases/user/RegisterUser';
import { BcryptAdapter } from '@/infra/adapters';
import { TenantRepository, UserRepository } from '@/infra/db/mongodb';
import { RegisterUserController } from '@/presentation/controllers/user';
import { Controller } from '@/presentation/protocols';

export class RegisterUserControllerFactory {
  static create(): Controller {
    const userRepository = new UserRepository();
    const bcrypt = new BcryptAdapter();
    const tenantRepository = new TenantRepository();
    const dbRegisterUserUseCase = new RegisterUserUseCase(
      userRepository,
      userRepository,
      bcrypt,
      tenantRepository
    );
    const registerUserController = new RegisterUserController(
      dbRegisterUserUseCase
    );
    return registerUserController;
  }
}
