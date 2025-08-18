import {
  CreateTenantRepository,
  CreateTenantDTO,
  GetTenantByIdRepository,
  UpdateTenantByIdRepository,
  UpdateTenantDataDTO,
} from '@/data/protocols/db/tenant';
import { TenantModel } from './models';
import { Tenant } from '@/domain/models/tenant';

export class TenantRepository
  implements
    CreateTenantRepository,
    GetTenantByIdRepository,
    UpdateTenantByIdRepository
{
  async create(data: CreateTenantDTO): Promise<Tenant> {
    const tenant = new TenantModel(data);
    await tenant.save();
    return tenant.toObject();
  }

  async getById(tenantId: string): Promise<Tenant | null> {
    const tenant = await TenantModel.findById(tenantId);
    return tenant ? tenant.toObject() : null;
  }

  async updateById(
    tenantId: string,
    tenantData: UpdateTenantDataDTO
  ): Promise<Tenant | null> {
    const tenant = await TenantModel.findByIdAndUpdate(tenantId, tenantData, {
      new: true,
    });
    return tenant ? tenant.toObject() : null;
  }
}
