import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { notFound, ok } from '../../helpers/httpResponses';
import { GetUserById } from '@/domain/usecases/user';

export class GetCurrentUserController implements Controller {
  constructor(private getUserById: GetUserById) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const userId = request.payload?.userId!;
    const user = await this.getUserById.execute({ userId });

    if (!user) {
      return notFound();
    }

    return ok(user);
  }
}
