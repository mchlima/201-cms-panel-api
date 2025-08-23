import { User } from '@/domain/models/user';
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

const userSchema = new Schema(
  {
    tenantId: { type: Schema.Types.ObjectId, required: true, ref: 'Tenant' },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: imageSchema, required: false, default: null },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ['admin', 'editor', 'viewer'], required: true },
  },
  {
    timestamps: true,
    collection: 'users',
  }
);

userSchema.index({ email: 1 });
userSchema.index({ tenantId: 1 });
userSchema.index({ tenantId: 1, role: 1 });
userSchema.index({ createdAt: -1 });

export const UserModel = model<User>('User', userSchema);
