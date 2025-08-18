export interface Storage {
  upload(params: {
    bucket: string;
    key: string;
    body: Buffer | Uint8Array | Blob | string;
    contentType?: string;
    isPublic?: boolean;
  }): Promise<void>;
  download(params: { bucket: string; key: string }): Promise<Buffer>;
  delete(params: { bucket: string; key: string }): Promise<void>;
  list(params: { bucket: string; prefix?: string }): Promise<string[]>;
  makePublicUrl(params: { bucket: string; key: string }): string;
}
export type UploadDTO = Parameters<Storage['upload']>[0];
export type DownloadDTO = Parameters<Storage['download']>[0];
export type DeleteDTO = Parameters<Storage['delete']>[0];
export type ListDTO = Parameters<Storage['list']>[0];
export type MakePublicUrlDTO = Parameters<Storage['makePublicUrl']>[0];
