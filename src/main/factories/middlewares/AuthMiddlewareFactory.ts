import { JwtAdapter } from '@/infra/adapters/Jwt';
import { authMiddleware } from '@/presentation/middlewares';

export class AuthMiddlewareFactory {
  static make(): ReturnType<typeof authMiddleware> {
    const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET!);
    return authMiddleware(jwtAdapter);
  }
}
