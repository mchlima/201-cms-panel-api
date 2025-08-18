import { UpdateUserAvatarByIdRepository } from '@/data/protocols/db/user';
import { ImageProcessor } from '@/data/protocols/image';
import { User } from '@/domain/models/user';
import {
  UpdateUserAvatarById,
  UpdateUserAvatarByIdDTO,
} from '@/domain/usecases/user';
import { MinioStorage } from '@/infra/storage/MinioStorage';
import { BadRequestError } from '@/presentation/errors';

const AVATAR_SCALES = {
  original: 1,
  large: 0.75,
  medium: 0.5,
  small: 0.25,
};

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
    }

    const metadata = await this.imageProcessor.metadata(file);
    const widthOriginal = metadata.width ?? 800;
    let urls: User['avatar']['urls'] = {
      original: '',
      large: '',
      medium: '',
      small: '',
    };

    for (const [label, factor] of Object.entries(AVATAR_SCALES)) {
      const typedLabel = label as keyof typeof AVATAR_SCALES;
      const width = Math.round(widthOriginal * factor);

      let image: Buffer = await this.imageProcessor.resize(file, { width });
      if (outputFormat === 'webp')
        image = await this.imageProcessor.convert(image, {
          format: 'webp',
          quality: 80,
        });
      else if (outputFormat === 'avif')
        image = await this.imageProcessor.convert(image, {
          format: 'avif',
          quality: 50,
        });

      const fileName = `${typedLabel}-avatar-${userId}.${outputFormat}`;
      const key = `avatars/${userId}/${fileName}`;

      await this.storage.upload({
        key,
        body: image,
        contentType: `image/${outputFormat}`,
        isPublic: true,
      });

      urls[typedLabel] = this.storage.makePublicUrl({ key });
    }

    return this.userRepository.updateAvatarById(userId, {
      avatar: { urls },
    });
  }
}
