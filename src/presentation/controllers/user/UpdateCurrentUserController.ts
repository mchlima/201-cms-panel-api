import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { notFound, ok } from '../../helpers/httpResponses';
import { UpdateUserById } from '@/domain/usecases/user';

export class UpdateCurrentUserController implements Controller {
  constructor(private updateUserById: UpdateUserById) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const userId = request.payload?.userId!;
    const userData = request.body;
    const user = await this.updateUserById.execute({ userId, userData });

    if (!user) {
      return notFound();
    }

    return ok(user);
  }
}
