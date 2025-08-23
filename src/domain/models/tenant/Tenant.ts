export type TenantStatus = 'inactive' | 'active' | 'cancelled';

export type Tenant = {
  _id?: string;
  sellerId?: string;
  name: string;
  slug: string;
  avatar: {
    variants: [{ size: string; url: string }];
  };
  status: TenantStatus;
  statusReason?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
