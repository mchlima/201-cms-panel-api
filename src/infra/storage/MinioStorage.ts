import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import type { _Object as S3Object } from '@aws-sdk/client-s3';
import {
  DeleteDTO,
  DownloadDTO,
  ListDTO,
  MakePublicUrlDTO,
  Storage,
  UploadDTO,
} from '@/data/protocols/storage';
import { Readable } from 'stream';
import { CriticalError, NotFoundError } from '@/presentation/errors';

export class MinioStorage implements Storage {
  private client: S3Client;
  private endpoint: string;
  private bucket: string;

  constructor(config: {
    bucket: string;
    endpoint: string;
    accessKeyId: string;
    secretAccessKey: string;
    region?: string;
  }) {
    this.bucket = config.bucket;
    this.client = new S3Client({
      endpoint: config.endpoint,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
      region: config.region ?? 'us-east-1',
      forcePathStyle: true,
    });

    this.endpoint = config.endpoint;
  }

  async upload({ key, body, contentType, isPublic }: UploadDTO): Promise<void> {
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
        ACL: isPublic ? 'public-read' : undefined,
      })
    );
  }

  async download({ key }: DownloadDTO): Promise<Buffer> {
    const response = await this.client.send(
      new GetObjectCommand({ Bucket: this.bucket, Key: key })
    );

    if (response.Body instanceof Readable) {
      const chunks: Buffer[] = [];
      for await (const chunk of response.Body) {
        chunks.push(chunk as Buffer);
      }
      return Buffer.concat(chunks);
    }

    if (!response.Body) {
      throw new NotFoundError('OBJECT_NOT_FOUND');
    }

    if (response.Body instanceof Uint8Array) {
      return Buffer.from(response.Body);
    }

    throw new CriticalError('STORAGE_BODY_UNSUPPORTED_TYPE');
  }

  async delete({ key }: DeleteDTO): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({ Bucket: this.bucket, Key: key })
    );
  }

  async list({ prefix }: ListDTO): Promise<string[]> {
    let continuationToken: string | undefined;
    const keys: string[] = [];

    do {
      const response = await this.client.send(
        new ListObjectsV2Command({
          Bucket: this.bucket,
          Prefix: prefix,
          ContinuationToken: continuationToken,
        })
      );

      const contents: S3Object[] = response.Contents ?? [];
      keys.push(
        ...contents
          .map(obj => obj.Key)
          .filter((key): key is string => Boolean(key))
      );

      continuationToken = response.NextContinuationToken;
    } while (continuationToken);

    return keys;
  }

  makePublicUrl({ key }: MakePublicUrlDTO): string {
    return `${this.endpoint}/${this.bucket}/${key}`;
  }
}
