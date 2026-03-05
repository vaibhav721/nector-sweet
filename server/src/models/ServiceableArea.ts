import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const serviceableAreaSchema = new Schema(
  {
    cityId: { type: Schema.Types.ObjectId, ref: 'ServiceableCity', required: true, index: true },
    name: { type: String, required: true },
    label: { type: String, required: true },
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
);

serviceableAreaSchema.index({ cityId: 1, name: 1 }, { unique: true });

export type ServiceableAreaDocument = InferSchemaType<typeof serviceableAreaSchema>;
export const ServiceableAreaModel = mongoose.model('ServiceableArea', serviceableAreaSchema);
