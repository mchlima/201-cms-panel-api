import { Tenant } from '@/domain/models/tenant';
import { Schema, model } from 'mongoose';

const tenantSchema = new Schema(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'Seller',
    },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    logoUrl: { type: String },
    status: {
      type: String,
      enum: ['inactive', 'active', 'cancelled'],
      required: true,
    },
    statusReason: { type: String },
  },
  {
    timestamps: true,
    collection: 'tenants',
  }
);

tenantSchema.index({ createdAt: -1 });
tenantSchema.index({ sellerId: 1, status: 1 });
tenantSchema.index({ status: 1 });
tenantSchema.index({ sellerId: 1 });

export const TenantModel = model<Tenant>('Tenant', tenantSchema);
