import { Tenant } from '@/domain/models/tenant';
import { Schema, model } from 'mongoose';

const imageVariantSchema = new Schema(
  {
    size: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false }
);

const imageSchema = new Schema(
  {
    variants: {
      type: [imageVariantSchema],
      required: true,
      validate: {
        validator: (value: any[]) => value.length > 0,
        message: 'At least one image variant is required',
      },
    },
  },
  { _id: false }
);

const tenantSchema = new Schema(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'Seller',
    },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    avatar: { type: imageSchema, required: false, default: null },
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
