import { User } from '@/domain/models/user';
import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    tenantId: { type: Schema.Types.ObjectId, required: true, ref: 'Tenant' },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ['admin', 'editor', 'viewer'], required: true },
  },
  {
    timestamps: true,
    collection: 'users',
  }
);

userSchema.index({ tenantId: 1 });
userSchema.index({ tenantId: 1, role: 1 });
userSchema.index({ createdAt: -1 });

export const UserModel = model<User>('User', userSchema);
