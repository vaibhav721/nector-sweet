import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const adminUserSchema = new Schema(
  {
    firebaseUid: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
);

export type AdminUserDocument = InferSchemaType<typeof adminUserSchema>;
export const AdminUserModel = mongoose.model('AdminUser', adminUserSchema);
