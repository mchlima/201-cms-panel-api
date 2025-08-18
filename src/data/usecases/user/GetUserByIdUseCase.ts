import { GetUserByIdRepository } from '@/data/protocols/db/user';
import { User } from '@/domain/models/user';
import { GetUserById, GetUserByIdDTO } from '@/domain/usecases/user';

export class GetUserByIdUseCase implements GetUserById {
  constructor(private userRepository: GetUserByIdRepository) {}

  async execute(params: GetUserByIdDTO): Promise<User | null> {
    const { userId, withPasswordHash = false } = params;
    return this.userRepository.getById(userId, withPasswordHash);
  }
}
