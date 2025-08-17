import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { ok } from '../../helpers/httpResponses';
import { SignInUser } from '@/domain/usecases/user';

export class SignInUserController implements Controller {
  constructor(private signInUser: SignInUser) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { email, password } = request.body;
    const accessToken = await this.signInUser.execute({
      email,
      password,
    });

    return ok({ accessToken });
  }
}
