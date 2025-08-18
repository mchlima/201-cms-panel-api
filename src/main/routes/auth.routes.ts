import { Router } from 'express';
import { expressControllerAdapter } from '../adapters/expressControllerAdapter';
import { validate } from '../middlewares/validate';
import { SignInUserControllerFactory } from '../factories/controllers/user';
import { signInUserSchema } from '@/schemas/user';

const router = Router();

router.post(
  '/signin',
  validate(signInUserSchema),
  expressControllerAdapter(SignInUserControllerFactory.make())
);

export const prefix = '/auth';
export default router;
