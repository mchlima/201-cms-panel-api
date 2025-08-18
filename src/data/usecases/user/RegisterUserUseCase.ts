import { RegisterUser, RegisterUserDTO } from '@/domain/usecases/user';
import {
  CheckIfUserExistsByEmailRepository,
  CreateUserRepository,
} from '@/data/protocols/db/user';
import { User } from '@/domain/models/user';
import { CreateTenantRepository } from '@/data/protocols/db/tenant';
import { Hasher } from '@/data/protocols/cryptography';
import { BadRequestError } from '@/presentation/errors';

export class RegisterUserUseCase implements RegisterUser {
  constructor(
    private readonly createUserRepository: CreateUserRepository,
    private readonly checkIfUserExistsByEmailRepository: CheckIfUserExistsByEmailRepository,
    private readonly hasher: Hasher,
    private readonly createTenantRepository: CreateTenantRepository
  ) {}

  async execute(data: RegisterUserDTO): Promise<User> {
    const { password, ...userDataWithoutPassword } = data.user;
    const tenantData = data.tenant;

    const userExists =
      await this.checkIfUserExistsByEmailRepository.checkIfExistsByEmail(
        userDataWithoutPassword.email
      );

    if (userExists) throw new BadRequestError('EMAIL_ALREADY_EXISTS');

    const hash = await this.hasher.hash(password);

    const tenant = await this.createTenantRepository.create({
      ...tenantData,
      status: 'active',
    });

    const { passwordHash, ...createdUser } =
      await this.createUserRepository.create({
        ...userDataWithoutPassword,
        tenantId: tenant._id!,
        passwordHash: hash,
        role: 'admin',
      });

    return createdUser;
  }
}
