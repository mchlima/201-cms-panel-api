export type TenantStatus = 'inactive' | 'active' | 'cancelled';

export type Tenant = {
  _id?: string;
  sellerId?: string;
  name: string;
  slug: string;
  avatar: {
    urls: {
      original: string;
      small: string;
      medium: string;
      large: string;
    };
  };
  status: TenantStatus;
  statusReason?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
