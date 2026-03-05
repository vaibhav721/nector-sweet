import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const addressSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    line1: { type: String, required: true },
    line2: { type: String },
    landmark: { type: String },
    city: { type: String, required: true },
    area: { type: String, required: true },
    pincode: { type: String, required: true, index: true },
    isPrimary: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
);

addressSchema.index({ userId: 1, isPrimary: 1 });

export type AddressDocument = InferSchemaType<typeof addressSchema>;
export const AddressModel = mongoose.model('Address', addressSchema);
