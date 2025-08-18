import { Tenant, TenantStatus } from '@/domain/models/tenant';

export type UpdateTenantDataDTO = {
  sellerId?: string;
  name?: string;
  slug?: string;
  logoUrl?: string;
  status?: TenantStatus;
  statusReason?: string;
};

export interface UpdateTenantByIdRepository {
  updateById(
    tenantId: string,
    tenantData: UpdateTenantDataDTO
  ): Promise<Tenant | null>;
}
