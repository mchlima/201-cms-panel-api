import { UpdateTenantByIdRepository } from '@/data/protocols/db/tenant';
import { Tenant } from '@/domain/models/tenant';
import {
  UpdateTenantById,
  UpdateTenantByIdDTO,
} from '@/domain/usecases/tenant/UpdateTenantById';

export class UpdateTenantByIdUseCase implements UpdateTenantById {
  constructor(private tenantRepository: UpdateTenantByIdRepository) {}

  async execute(params: UpdateTenantByIdDTO): Promise<Tenant | null> {
    const { tenantId, tenantData } = params;
    return this.tenantRepository.updateById(tenantId, tenantData);
  }
}
