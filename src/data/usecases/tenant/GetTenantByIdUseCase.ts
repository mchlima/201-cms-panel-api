import { GetTenantByIdRepository } from '@/data/protocols/db/tenant';
import { Tenant } from '@/domain/models/tenant';
import { GetTenantById, GetTenantByIdDTO } from '@/domain/usecases/tenant';

export class GetTenantByIdUseCase implements GetTenantById {
  constructor(private tenantRepository: GetTenantByIdRepository) {}

  async execute(params: GetTenantByIdDTO): Promise<Tenant | null> {
    const { tenantId } = params;
    return this.tenantRepository.getById(tenantId);
  }
}
