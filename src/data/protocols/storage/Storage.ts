export interface Storage {
  upload(params: {
    key: string;
    body: Buffer | Uint8Array | Blob | string;
    contentType?: string;
    isPublic?: boolean;
  }): Promise<void>;
  download(params: { key: string }): Promise<Buffer>;
  delete(params: { key: string }): Promise<void>;
  list(params: { prefix?: string }): Promise<string[]>;
  makePublicUrl(params: { key: string }): string;
}
export type UploadDTO = Parameters<Storage['upload']>[0];
export type DownloadDTO = Parameters<Storage['download']>[0];
export type DeleteDTO = Parameters<Storage['delete']>[0];
export type ListDTO = Parameters<Storage['list']>[0];
export type MakePublicUrlDTO = Parameters<Storage['makePublicUrl']>[0];
