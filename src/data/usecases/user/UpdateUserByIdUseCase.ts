import { UpdateUserByIdRepository } from '@/data/protocols/db/user';
import { User } from '@/domain/models/user';
import { UpdateUserById, UpdateUserByIdDTO } from '@/domain/usecases/user';

export class UpdateUserByIdUseCase implements UpdateUserById {
  constructor(private userRepository: UpdateUserByIdRepository) {}

  async execute(params: UpdateUserByIdDTO): Promise<User | null> {
    const { userId, userData } = params;
    return this.userRepository.updateById(userId, userData);
  }
}
