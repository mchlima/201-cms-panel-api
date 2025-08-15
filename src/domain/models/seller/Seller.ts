export type SellerStatus = 'active' | 'inactive' | 'cancelled';

export type Seller = {
  _id?: string;
  name: string;
  displayName: string;
  logoUrl: string;
  comissionPercentage: number;
  status: SellerStatus;
  createdAt?: Date;
  updatedAt?: Date;
};
