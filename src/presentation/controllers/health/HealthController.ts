import { Health } from '@/domain/usecases/health';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { ok } from '../../helpers/httpResponses';

export class HealthController implements Controller {
  constructor(private health: Health) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { numberOne, numberTwo } = request.body;
    const sum = await this.health.execute({
      numberOne,
      numberTwo,
    });

    return ok({ message: 'API is running 🚀', db: sum });
  }
}
