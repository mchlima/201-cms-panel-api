import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { notFound, ok } from '../../helpers/httpResponses';
import { GetTenantById } from '@/domain/usecases/tenant/GetTenantById';

export class GetCurrentTenantController implements Controller {
  constructor(private getTenantById: GetTenantById) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const tenantId = request.payload?.tenantId!;
    const tenant = await this.getTenantById.execute({ tenantId });

    if (!tenant) {
      return notFound();
    }

    return ok(tenant);
  }
}
