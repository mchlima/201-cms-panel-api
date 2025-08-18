import { UpdateTenantByIdUseCase } from '@/data/usecases/tenant';
import { TenantRepository } from '@/infra/db/mongodb';
import { UpdateCurrentTenantController } from '@/presentation/controllers/tenant';
import { Controller } from '@/presentation/protocols';

export class UpdateCurrentTenantControllerFactory {
  static make(): Controller {
    const tenantRepository = new TenantRepository();
    const updateTenantByIdUseCase = new UpdateTenantByIdUseCase(
      tenantRepository
    );
    const updateCurrentTenantController = new UpdateCurrentTenantController(
      updateTenantByIdUseCase
    );
    return updateCurrentTenantController;
  }
}
