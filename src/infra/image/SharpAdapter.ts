import sharp from 'sharp';
import {
  ImageProcessor,
  ResizeOptions,
  ConvertOptions,
} from '@/data/protocols/image';

export class SharpAdapter implements ImageProcessor {
  async resize(image: Buffer, options: ResizeOptions): Promise<Buffer> {
    const { width, height, fit = 'inside' } = options;
    return sharp(image).resize({ width, height, fit }).toBuffer();
  }

  async convert(image: Buffer, options: ConvertOptions): Promise<Buffer> {
    const { format, quality = 80 } = options;

    let img = sharp(image);
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

    return img.toBuffer();
  }

  async metadata(
    image: Buffer
  ): Promise<{ width?: number; height?: number; format?: string }> {
    return sharp(image).metadata();
  }
}
