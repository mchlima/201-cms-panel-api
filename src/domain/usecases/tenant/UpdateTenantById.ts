import { UseCase } from '../';
import { Tenant, TenantStatus } from '@/domain/models/tenant';

export type UpdateTenantByIdDTO = {
  tenantId: string;
  tenantData: {
    sellerId?: string;
    name?: string;
    slug?: string;
    logoUrl?: string;
    status?: TenantStatus;
    statusReason?: string;
  };
};

export interface UpdateTenantById
  extends UseCase<UpdateTenantByIdDTO, Tenant | null> {}
