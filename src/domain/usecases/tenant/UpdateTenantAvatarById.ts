import { Tenant } from '@/domain/models/tenant';
import { UseCase } from '../UseCase';

export type UpdateTenantAvatarByIdDTO = {
  tenantId: string;
  file: Buffer;
  originalName: string;
  mimetype: string;
};

export interface UpdateTenantAvatarById
  extends UseCase<UpdateTenantAvatarByIdDTO, Tenant | null> {}
