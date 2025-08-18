import { GetTenantByIdUseCase } from '@/data/usecases/tenant';
import { TenantRepository } from '@/infra/db/mongodb';
import { GetCurrentTenantController } from '@/presentation/controllers/tenant';
import { Controller } from '@/presentation/protocols';

export class GetCurrentTenantControllerFactory {
  static make(): Controller {
    const tenantRepository = new TenantRepository();
    const getTenantByIdUseCase = new GetTenantByIdUseCase(tenantRepository);
    const getCurrentTenantController = new GetCurrentTenantController(
      getTenantByIdUseCase
    );
    return getCurrentTenantController;
  }
}
