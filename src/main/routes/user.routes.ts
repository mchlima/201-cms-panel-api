import { Router } from 'express';
import { expressControllerAdapter } from '../adapters/expressControllerAdapter';
import { validate } from '../middlewares/validate';
import { RegisterUserControllerFactory } from '../factories/controllers/user';
import { registerUserSchema } from '@/schemas/user';

const router = Router();

router.post(
  '/me',
  validate(registerUserSchema),
  expressControllerAdapter(RegisterUserControllerFactory.create())
);

export const prefix = '/users';
export default router;
