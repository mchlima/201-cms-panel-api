import { UpdateUserAvatarByIdRepository } from '@/data/protocols/db/user';
import { ImageProcessor } from '@/data/protocols/image';
import { User } from '@/domain/models/user';
import {
  UpdateUserAvatarById,
  UpdateUserAvatarByIdDTO,
} from '@/domain/usecases/user';
import { MinioStorage } from '@/infra/storage/MinioStorage';
import { BadRequestError } from '@/presentation/errors';

const SCALES = [
  { label: 'original', factor: 1 },
  { label: 'large', factor: 0.75 },
  { label: 'medium', factor: 0.5 },
  { label: 'small', factor: 0.25 },
];

export class UpdateUserAvatarByIdUseCase implements UpdateUserAvatarById {
  constructor(
    private readonly userRepository: UpdateUserAvatarByIdRepository,
    private readonly imageProcessor: ImageProcessor,
    private readonly storage: MinioStorage
  ) {}

  async execute({
    userId,
    file,
    originalName,
    mimetype,
  }: UpdateUserAvatarByIdDTO): Promise<User | null> {
    const extension = originalName.split('.').pop()?.toLocaleLowerCase();

    if (!extension) throw new BadRequestError('IMAGE_EXTENSION_UNDEFINED');

    let outputFormat: 'webp' | 'avif' | null = null;

    if (['jpeg', 'jpg', 'png', 'webp'].includes(extension)) {
      outputFormat = 'webp';
    } else if (['gif', 'avif'].includes(extension)) {
      outputFormat = 'avif';
    } else {
      throw new BadRequestError('IMAGE_EXTENSION_NOT_SUPPORTED');
    }

    const metadata = await this.imageProcessor.metadata(file);
    const widthOriginal = metadata.width ?? 800;
    let variants = [];

    for (const { label, factor } of SCALES) {
      const width = Math.round(widthOriginal * factor);

      await this.imageProcessor.setImage(file);
      await this.imageProcessor.resize({ width });
      await this.imageProcessor.convert({
        format: outputFormat,
        quality: 80,
      });

      const fileName = `${label}-${userId}.${outputFormat}`;
      const key = `avatars/users/${userId}/${fileName}`;

      await this.storage.upload({
        key,
        body: this.imageProcessor.getImage()!,
        contentType: `image/${outputFormat}`,
        isPublic: true,
      });

      variants.push({
        size: label,
        url: this.storage.makePublicUrl({ key }),
      });
    }

    return this.userRepository.updateAvatarById(userId, {
      variants,
    } as User['avatar']);
  }
}
