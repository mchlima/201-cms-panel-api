import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { ok } from '../../helpers/httpResponses';
import { RegisterUser } from '@/domain/usecases/user';

export class RegisterUserController implements Controller {
  constructor(private registerUser: RegisterUser) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { user, tenant } = request.body;
    const createdUser = await this.registerUser.execute({
      user,
      tenant,
    });

    return ok(createdUser);
  }
}
