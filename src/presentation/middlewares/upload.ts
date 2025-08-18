import multer, { FileFilterCallback } from 'multer';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError, CriticalError } from '@/presentation/errors';

export const uploadMiddleware = (
  fieldName: string,
  allowedMimeTypes: string[]
) => {
  const storage = multer.memoryStorage();

  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new BadRequestError('UNSUPPORTED_FILE_TYPE'));
    }
  };

  const upload = multer({ storage, fileFilter }).single(fieldName);

  return (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, (err: any) => {
      if (err) {
        if (err instanceof BadRequestError) throw err;
        throw new CriticalError('FILE_UPLOAD_ERROR', err.message);
      }
      next();
    });
  };
};
