import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const serviceableCitySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
);

export type ServiceableCityDocument = InferSchemaType<typeof serviceableCitySchema>;
export const ServiceableCityModel = mongoose.model('ServiceableCity', serviceableCitySchema);
