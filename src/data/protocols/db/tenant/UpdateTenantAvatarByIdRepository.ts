import { Tenant } from '@/domain/models/tenant';

export interface UpdateTenantAvatarByIdRepository {
  updateAvatarById(
    tenantId: string,
    avatar: {
      variants: { size: string; url: string }[];
    }
  ): Promise<Tenant | null>;
}
