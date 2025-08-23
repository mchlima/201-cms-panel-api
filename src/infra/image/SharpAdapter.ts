import sharp from 'sharp';
import {
  ImageProcessor,
  ResizeOptions,
  ConvertOptions,
} from '@/data/protocols/image';

export class SharpAdapter implements ImageProcessor {
  private image: Buffer | null = null;

  async resize(options: ResizeOptions): Promise<SharpAdapter> {
    if (!this.image) throw new Error('Image not set');
    const { width, height, fit = 'inside' } = options;
    this.image = await sharp(this.image)
      .resize({ width, height, fit })
      .toBuffer();
    return this;
  }

  async convert(options: ConvertOptions): Promise<SharpAdapter> {
    if (!this.image) throw new Error('Image not set');
    const { format, quality = 80 } = options;
    let img = sharp(this.image);
    switch (format) {
      case 'webp':
        img = img.webp({ quality });
        break;
      case 'jpeg':
        img = img.jpeg({ quality });
        break;
      case 'png':
        img = img.png({ quality });
        break;
      case 'avif':
        img = img.avif({ quality });
        break;
      default:
        throw new Error(`Unsupported format: ${format}`);
    }

    this.image = await img.toBuffer();

    return this;
  }

  setImage(image: Buffer): void {
    this.image = image;
  }

  getImage(): Buffer | null {
    return this.image;
  }

  async metadata(
    image: Buffer
  ): Promise<{ width?: number; height?: number; format?: string }> {
    return sharp(image).metadata();
  }
}
