import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const expiryRecordSchema = new Schema(
  {
    variantId: { type: Schema.Types.ObjectId, ref: 'ProductVariant', required: true, index: true },
    quantity: { type: Number, required: true },
    expiryDate: { type: Date, required: true, index: true },
    status: { type: String, enum: ['ACTIVE', 'EXPIRED', 'DISCARDED'], default: 'ACTIVE' },
    note: { type: String }
  },
  {
    timestamps: true
  }
);

expiryRecordSchema.index({ variantId: 1, expiryDate: 1 });

export type ExpiryRecordDocument = InferSchemaType<typeof expiryRecordSchema>;
export const ExpiryRecordModel = mongoose.model('ExpiryRecord', expiryRecordSchema);
