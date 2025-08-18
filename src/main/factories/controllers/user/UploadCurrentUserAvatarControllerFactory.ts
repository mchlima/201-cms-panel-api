import { UpdateUserAvatarByIdUseCase } from '@/data/usecases/user';
import { UserRepository } from '@/infra/db/mongodb';
import { SharpAdapter } from '@/infra/image';
import { MinioStorage } from '@/infra/storage/MinioStorage';
import { UploadCurrentUserAvatarController } from '@/presentation/controllers/user';
import { Controller } from '@/presentation/protocols';

export class UploadCurrentUserAvatarControllerFactory {
  static make(): Controller {
    console.log({
      bucket: process.env.MINIO_BUCKET_NAME!,
      endpoint: process.env.MINIO_ENDPOINT!,
      accessKeyId: process.env.MINIO_ACCESS_KEY_ID!,
      secretAccessKey: process.env.MINIO_SECRET_ACCESS_KEY!,
      region: process.env.MINIO_REGION!,
    });
    const uploadCurrentUserAvatarController =
      new UploadCurrentUserAvatarController(
        new UpdateUserAvatarByIdUseCase(
          new UserRepository(),
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
    return uploadCurrentUserAvatarController;
  }
}
