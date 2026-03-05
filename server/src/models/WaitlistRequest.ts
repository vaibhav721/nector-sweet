import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const waitlistRequestSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    city: { type: String, required: true },
    area: { type: String, required: true },
    pincode: { type: String, required: true, index: true },
    status: { type: String, enum: ['NEW', 'CONTACTED', 'CLOSED'], default: 'NEW', index: true },
    note: { type: String }
  },
  {
    timestamps: true
  }
);

waitlistRequestSchema.index({ createdAt: -1 });

export type WaitlistRequestDocument = InferSchemaType<typeof waitlistRequestSchema>;
export const WaitlistRequestModel = mongoose.model('WaitlistRequest', waitlistRequestSchema);
