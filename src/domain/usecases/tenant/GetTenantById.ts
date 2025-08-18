import { UseCase } from '../';
import { Tenant } from '@/domain/models/tenant';

export type GetTenantByIdDTO = {
  tenantId: string;
};

export interface GetTenantById
  extends UseCase<GetTenantByIdDTO, Tenant | null> {}
