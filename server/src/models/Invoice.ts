import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const invoiceSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true, unique: true, index: true },
    invoiceNumber: { type: String, required: true, unique: true, index: true },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    status: { type: String, enum: ['ISSUED', 'PENDING', 'CANCELLED'], default: 'ISSUED' },
    issuedAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
);

export type InvoiceDocument = InferSchemaType<typeof invoiceSchema>;
export const InvoiceModel = mongoose.model('Invoice', invoiceSchema);
