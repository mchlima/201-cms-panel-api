export type ResizeOptions = {
  width?: number;
  height?: number;
  fit?: 'cover' | 'contain' | 'inside' | 'outside';
};

export type ConvertOptions = {
  format: 'webp' | 'jpeg' | 'png' | 'avif';
  quality?: number;
};

export interface ImageProcessor {
  resize(image: Buffer, options: ResizeOptions): Promise<Buffer>;
  convert(image: Buffer, options: ConvertOptions): Promise<Buffer>;
  metadata(
    image: Buffer
  ): Promise<{ width?: number; height?: number; format?: string }>;
}
