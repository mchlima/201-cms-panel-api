import { Tenant } from '@/domain/models/tenant';

export interface UpdateTenantAvatarByIdRepository {
  updateAvatarById(
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
  ): Promise<Tenant | null>;
}
