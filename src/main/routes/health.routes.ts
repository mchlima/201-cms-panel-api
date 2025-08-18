import { Router } from 'express';
import { expressControllerAdapter } from '../adapters/expressControllerAdapter';
import { HealthControllerFactory } from '../factories/controllers/health';
import { testSchema } from '@/schemas/test.schema';
import { validate } from '../middlewares/validate';

const router = Router();

router.post(
  '/',
  validate(testSchema),
  expressControllerAdapter(HealthControllerFactory.make())
);

export const prefix = '/health';
export default router;
