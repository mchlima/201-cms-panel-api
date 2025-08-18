import { Router } from 'express';
import { expressControllerAdapter } from '../adapters/expressControllerAdapter';
import { AuthMiddlewareFactory } from '../factories/middlewares';
import {
  GetCurrentTenantControllerFactory,
  UpdateCurrentTenantControllerFactory,
} from '../factories/controllers/tenant';
import { validate } from '../middlewares/validate';
import { updateCurrentTenantSchema } from '@/schemas/tenant';

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

export const prefix = '/tenant';
export default router;
