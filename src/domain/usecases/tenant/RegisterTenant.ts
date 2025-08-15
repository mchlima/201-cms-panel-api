import { UseCase } from '../';
import { Tenant } from '@/domain/models/tenant';

export type RegisterTenantDTO = Omit<Tenant, '_id' | 'createdAt' | 'updatedAt'>;

export interface RegisterTenant extends UseCase<RegisterTenantDTO, Tenant> {}
