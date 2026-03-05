import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const userSchema = new Schema(
  {
    firebaseUid: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, index: true, sparse: true },
    phone: { type: String, index: true, sparse: true },
    role: {
      type: String,
      enum: ['guest', 'customer', 'admin'],
      default: 'customer',
      index: true
    },
    primaryAddressId: { type: Schema.Types.ObjectId, ref: 'Address' },
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
);

export type UserDocument = InferSchemaType<typeof userSchema>;
export const UserModel = mongoose.model('User', userSchema);
