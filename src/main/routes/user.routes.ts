import { Router } from 'express';
import { expressControllerAdapter } from '../adapters/expressControllerAdapter';
import { validate } from '../middlewares/validate';
import {
  GetCurrentUserControllerFactory,
  RegisterUserControllerFactory,
  UpdateCurrentUserControllerFactory,
} from '../factories/controllers/user';
import { registerUserSchema, updateCurrentUserSchema } from '@/schemas/user';
import { AuthMiddlewareFactory } from '../factories/middlewares';

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

export const prefix = '/user';
export default router;
