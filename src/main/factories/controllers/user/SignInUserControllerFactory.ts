import { SignInUserUseCase } from '@/data/usecases/user';
import { BcryptAdapter } from '@/infra/adapters';
import { JwtAdapter } from '@/infra/adapters/Jwt';
import { UserRepository } from '@/infra/db/mongodb';
import { SignInUserController } from '@/presentation/controllers/user';
import { Controller } from '@/presentation/protocols';

export class SignInUserControllerFactory {
  static make(): Controller {
    const jwt = new JwtAdapter(process.env.JWT_SECRET!);
    const bcrypt = new BcryptAdapter();
    const userRepository = new UserRepository();
    const signInUserUseCase = new SignInUserUseCase(
      userRepository,
      bcrypt,
      jwt
    );
    const signInUserController = new SignInUserController(signInUserUseCase);
    return signInUserController;
  }
}
