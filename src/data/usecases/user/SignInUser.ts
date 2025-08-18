import { SignInUser, SignInUserDTO } from '@/domain/usecases/user';
import { GetUserByEmailRepository } from '@/data/protocols/db/user';
import { Encrypter, HashCompare } from '@/data/protocols/cryptography';
import { BadRequestError } from '@/presentation/errors';

export class SignInUserUseCase implements SignInUser {
  constructor(
    private readonly getUserByEmailRepository: GetUserByEmailRepository,
    private readonly hashCompare: HashCompare,
    private readonly encrypter: Encrypter
  ) {}

  async execute(data: SignInUserDTO): Promise<string> {
    const user = await this.getUserByEmailRepository.getByEmail(
      data.email,
      true
    );

    if (!user) throw new BadRequestError('INVALID_CREDENTIALS');

    const isValid = await this.hashCompare.compare(
      data.password,
      user.passwordHash!
    );

    if (!isValid) throw new BadRequestError('INVALID_CREDENTIALS');

    const { passwordHash, ...userWithoutPasswordHash } = user;

    const accessToken = await this.encrypter.encrypt(userWithoutPasswordHash);

    return accessToken;
  }
}
