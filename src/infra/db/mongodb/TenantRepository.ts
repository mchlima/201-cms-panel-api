import {
  CreateTenantRepository,
  CreateTenantDTO,
  GetTenantByIdRepository,
  UpdateTenantByIdRepository,
  UpdateTenantDataDTO,
  UpdateTenantAvatarByIdRepository,
} from '@/data/protocols/db/tenant';
import { TenantModel } from './models';
import { Tenant } from '@/domain/models/tenant';

export class TenantRepository
  implements
    CreateTenantRepository,
    GetTenantByIdRepository,
    UpdateTenantByIdRepository,
    UpdateTenantAvatarByIdRepository
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

  async updateAvatarById(
    tenantId: string,
    avatarData: {
      avatar: {
        urls: {
          original: string;
          small: string;
          medium: string;
          large: string;
        };
      };
    }
  ): Promise<Tenant | null> {
    const updatedTenant = await TenantModel.findByIdAndUpdate(
      tenantId,
      { $set: avatarData },
      { new: true }
    );

    return updatedTenant ? (updatedTenant.toObject() as Tenant) : null;
  }
}
