import { Router } from 'express';
import { expressControllerAdapter } from '../adapters/expressControllerAdapter';
import { AuthMiddlewareFactory } from '../factories/middlewares';
import { GetCurrentTenantControllerFactory } from '../factories/controllers/tenant';

const router = Router();
const auth = AuthMiddlewareFactory.make();

router.get(
  '/me',
  auth,
  expressControllerAdapter(GetCurrentTenantControllerFactory.make())
);

export const prefix = '/tenant';
export default router;
