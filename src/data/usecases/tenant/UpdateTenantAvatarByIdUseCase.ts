import { UpdateTenantAvatarByIdRepository } from '@/data/protocols/db/tenant';
import { ImageProcessor } from '@/data/protocols/image';
import { Tenant } from '@/domain/models/tenant';
import { UpdateTenantAvatarById } from '@/domain/usecases/tenant';
import { UpdateTenantAvatarByIdDTO } from '@/domain/usecases/tenant';
import { MinioStorage } from '@/infra/storage/MinioStorage';
import { BadRequestError } from '@/presentation/errors';

const SCALES = [
  { label: 'original', factor: 1 },
  { label: 'large', factor: 0.75 },
  { label: 'medium', factor: 0.5 },
  { label: 'small', factor: 0.25 },
];

export class UpdateTenantAvatarByIdUseCase implements UpdateTenantAvatarById {
  constructor(
    private readonly userRepository: UpdateTenantAvatarByIdRepository,
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

      const fileName = `${label}-${tenantId}.${outputFormat}`;
      const key = `avatars/tenants/${tenantId}/${fileName}`;

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

    return this.userRepository.updateAvatarById(tenantId, {
      variants,
    } as Tenant['avatar']);
  }
}
