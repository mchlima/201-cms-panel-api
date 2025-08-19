import { Router } from 'express';
import { expressControllerAdapter } from '../adapters/expressControllerAdapter';
import { AuthMiddlewareFactory } from '../factories/middlewares';
import {
  GetCurrentTenantControllerFactory,
  UpdateCurrentTenantControllerFactory,
  UploadCurrentTenantAvatarControllerFactory,
} from '../factories/controllers/tenant';
import { validate } from '../middlewares/validate';
import { updateCurrentTenantSchema } from '@/schemas/tenant';
import { uploadMiddleware } from '@/presentation/middlewares';

const router = Router();
const auth = AuthMiddlewareFactory.make();

router.get(
  '/me',
  auth,
  expressControllerAdapter(GetCurrentTenantControllerFactory.make())
);

router.put(
  '/me',
  auth,
  validate(updateCurrentTenantSchema),
  expressControllerAdapter(UpdateCurrentTenantControllerFactory.make())
);

router.put(
  '/me/avatar',
  auth,
  uploadMiddleware('file', [
    'image/webp',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/avif',
  ]),
  expressControllerAdapter(UploadCurrentTenantAvatarControllerFactory.make())
);

export const prefix = '/tenant';
export default router;
