import { Tenant, TenantStatus } from '@/domain/models/tenant';

type CreateTenantDTO = {
  sellerId: string;
  name: string;
  slug: string;
  status: TenantStatus;
};

export interface CreateTenantRepository {
  create(data: CreateTenantDTO): Promise<Tenant>;
}
