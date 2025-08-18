import { Router } from 'express';
import { expressControllerAdapter } from '../adapters/expressControllerAdapter';
import { validate } from '../middlewares/validate';
import {
  GetCurrentUserControllerFactory,
  RegisterUserControllerFactory,
  UpdateCurrentUserControllerFactory,
  UploadCurrentUserAvatarControllerFactory,
} from '../factories/controllers/user';
import { registerUserSchema, updateCurrentUserSchema } from '@/schemas/user';
import { AuthMiddlewareFactory } from '../factories/middlewares';
import { uploadMiddleware } from '@/presentation/middlewares';

const router = Router();
const auth = AuthMiddlewareFactory.make();

router.post(
  '/register',
  validate(registerUserSchema),
  expressControllerAdapter(RegisterUserControllerFactory.make())
);

router.get(
  '/me',
  auth,
  expressControllerAdapter(GetCurrentUserControllerFactory.make())
);

router.put(
  '/me',
  auth,
  validate(updateCurrentUserSchema),
  expressControllerAdapter(UpdateCurrentUserControllerFactory.make())
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
  expressControllerAdapter(UploadCurrentUserAvatarControllerFactory.make())
);

export const prefix = '/user';
export default router;
