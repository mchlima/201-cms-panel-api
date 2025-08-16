import { Seller } from '@/domain/models/seller';
import { Schema, model } from 'mongoose';

const sellerSchema = new Schema(
  {
    name: { type: String, required: true },
    displayName: { type: String, required: true },
    logoUrl: { type: String, default: null, required: false },
    comissionPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 0,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'cancelled'],
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: 'sellers',
  }
);

sellerSchema.index({ name: 1 });
sellerSchema.index({ createdAt: -1 });
sellerSchema.index({ status: 1 });

export const SellerModel = model<Seller>('Seller', sellerSchema);
