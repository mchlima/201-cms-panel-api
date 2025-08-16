import {
  CreateTenantRepository,
  CreateTenantDTO,
} from '@/data/protocols/db/tenant';
import { TenantModel } from './models';
import { Tenant } from '@/domain/models/tenant';

export class TenantRepository implements CreateTenantRepository {
  async create(data: CreateTenantDTO): Promise<Tenant> {
    const tenant = new TenantModel(data);
    await tenant.save();
    return tenant.toObject();
  }
}
