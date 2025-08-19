import { UpdateTenantAvatarByIdUseCase } from '@/data/usecases/tenant';
import { TenantRepository } from '@/infra/db/mongodb';
import { SharpAdapter } from '@/infra/image';
import { MinioStorage } from '@/infra/storage/MinioStorage';
import { UploadCurrentTenantAvatarController } from '@/presentation/controllers/tenant';
import { Controller } from '@/presentation/protocols';

export class UploadCurrentTenantAvatarControllerFactory {
  static make(): Controller {
    console.log({
      bucket: process.env.MINIO_BUCKET_NAME!,
      endpoint: process.env.MINIO_ENDPOINT!,
      accessKeyId: process.env.MINIO_ACCESS_KEY_ID!,
      secretAccessKey: process.env.MINIO_SECRET_ACCESS_KEY!,
      region: process.env.MINIO_REGION!,
    });
    const uploadCurrentTenantAvatarController =
      new UploadCurrentTenantAvatarController(
        new UpdateTenantAvatarByIdUseCase(
          new TenantRepository(),
          new SharpAdapter(),
          new MinioStorage({
            bucket: process.env.MINIO_BUCKET_NAME!,
            endpoint: process.env.MINIO_ENDPOINT!,
            accessKeyId: process.env.MINIO_ACCESS_KEY_ID!,
            secretAccessKey: process.env.MINIO_SECRET_ACCESS_KEY!,
            region: process.env.MINIO_REGION!,
          })
        )
      );
    return uploadCurrentTenantAvatarController;
  }
}
