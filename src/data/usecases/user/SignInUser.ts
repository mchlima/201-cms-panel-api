import { SignInUser, SignInUserDTO } from '@/domain/usecases/user';
import { GetUserByEmailWithPasswordHashRepository } from '@/data/protocols/db/user';
import { Encrypter, HashCompare } from '@/data/protocols/cryptography';
import { BadRequestError } from '@/presentation/errors';

export class SignInUserUseCase implements SignInUser {
  constructor(
    private readonly getUserByEmailRepository: GetUserByEmailWithPasswordHashRepository,
    private readonly hashCompare: HashCompare,
    private readonly encrypter: Encrypter
  ) {}

  async execute(data: SignInUserDTO): Promise<string> {
    const user = await this.getUserByEmailRepository.getByEmailWithPasswordHash(
      {
        email: data.email,
      }
    );

    if (!user) throw new BadRequestError('INVALID_CREDENTIALS');

    const isValid = await this.hashCompare.compare(
      data.password,
      user.passwordHash!
    );

    if (!isValid) throw new BadRequestError('INVALID_CREDENTIALS');

    const accessToken = await this.encrypter.encrypt(user);

    return accessToken;
  }
}
