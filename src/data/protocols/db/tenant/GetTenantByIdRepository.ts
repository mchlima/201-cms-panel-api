import { Tenant } from '@/domain/models/tenant';

export interface GetTenantByIdRepository {
  getById(tenantId: string): Promise<Tenant | null>;
}
