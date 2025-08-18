import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { notFound, ok } from '../../helpers/httpResponses';
import { UpdateTenantById } from '@/domain/usecases/tenant';

export class UpdateCurrentTenantController implements Controller {
  constructor(private updateTenantById: UpdateTenantById) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const tenantId = request.payload?.tenantId!;
    const tenantData = request.body;
    const tenant = await this.updateTenantById.execute({
      tenantId,
      tenantData,
    });

    if (!tenant) {
      return notFound();
    }

    return ok(tenant);
  }
}
