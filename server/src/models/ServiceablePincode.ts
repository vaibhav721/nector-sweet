import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const serviceablePincodeSchema = new Schema(
  {
    cityId: { type: Schema.Types.ObjectId, ref: 'ServiceableCity', required: true, index: true },
    areaId: { type: Schema.Types.ObjectId, ref: 'ServiceableArea', required: true, index: true },
    pincode: { type: String, required: true, unique: true, index: true },
    etaLabel: { type: String, default: 'Next day morning' },
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
);

export type ServiceablePincodeDocument = InferSchemaType<typeof serviceablePincodeSchema>;
export const ServiceablePincodeModel = mongoose.model('ServiceablePincode', serviceablePincodeSchema);
