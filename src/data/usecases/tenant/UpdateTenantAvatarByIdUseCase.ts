import { UpdateTenantAvatarByIdRepository } from '@/data/protocols/db/tenant';
import { ImageProcessor } from '@/data/protocols/image';
import { Tenant } from '@/domain/models/tenant';
import {
  UpdateTenantAvatarById,
  UpdateTenantAvatarByIdDTO,
} from '@/domain/usecases/tenant';
import { MinioStorage } from '@/infra/storage/MinioStorage';
import { BadRequestError } from '@/presentation/errors';

const AVATAR_SCALES = {
  original: 1,
  large: 0.75,
  medium: 0.5,
  small: 0.25,
};

export class UpdateTenantAvatarByIdUseCase implements UpdateTenantAvatarById {
  constructor(
    private readonly tenantRepository: UpdateTenantAvatarByIdRepository,
    private readonly imageProcessor: ImageProcessor,
    private readonly storage: MinioStorage
  ) {}

  async execute({
    tenantId,
    file,
    originalName,
    mimetype,
  }: UpdateTenantAvatarByIdDTO): Promise<Tenant | null> {
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
    let urls: Tenant['avatar']['urls'] = {
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

      const fileName = `${typedLabel}-${tenantId}.${outputFormat}`;
      const key = `avatars/tenants/${tenantId}/${fileName}`;

      await this.storage.upload({
        key,
        body: image,
        contentType: `image/${outputFormat}`,
        isPublic: true,
      });

      urls[typedLabel] = this.storage.makePublicUrl({ key });
    }

    return this.tenantRepository.updateAvatarById(tenantId, {
      avatar: { urls },
    });
  }
}
