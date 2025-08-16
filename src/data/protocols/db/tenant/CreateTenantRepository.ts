import { Tenant, TenantStatus } from '@/domain/models/tenant';

export type CreateTenantDTO = {
  sellerId: string;
  name: string;
  slug: string;
  status: TenantStatus;
};

export interface CreateTenantRepository {
  create(data: CreateTenantDTO): Promise<Tenant>;
}
