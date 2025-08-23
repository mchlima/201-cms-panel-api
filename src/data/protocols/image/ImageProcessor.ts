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
  setImage(image: Buffer): void;
  resize(options: ResizeOptions): Promise<ImageProcessor>;
  convert(options: ConvertOptions): Promise<ImageProcessor>;
  getImage(): Buffer | null;
  metadata(
    image: Buffer
  ): Promise<{ width?: number; height?: number; format?: string }>;
}
