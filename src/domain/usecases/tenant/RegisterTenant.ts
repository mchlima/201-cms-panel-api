import { UseCase } from '../';
import { Tenant } from '@/domain/models/tenant';

export type RegisterTenantDTO = {
  sellerId: string;
  name: string;
  slug: string;
};

export interface RegisterTenant extends UseCase<RegisterTenantDTO, Tenant> {}
