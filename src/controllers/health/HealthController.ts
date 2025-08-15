import { IHealthService } from '@/services/health';
import { IController, IHttpRequest, IHttpResponse } from '../IController';
import { ok } from '@/helpers/httpResponses';

export class HealthController implements IController {
  constructor(private healthService: IHealthService) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { numberOne, numberTwo } = request.body;
    const sum = await this.healthService.execute({
      numberOne,
      numberTwo,
    });

    return ok({ message: 'API is running 🚀', db: sum });
  }
}
