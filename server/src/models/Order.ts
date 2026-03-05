import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    orderNumber: { type: String, required: true, unique: true, index: true },
    status: {
      type: String,
      enum: ['PLACED', 'CONFIRMED', 'PACKING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'],
      default: 'PLACED',
      index: true
    },
    paymentStatus: {
      type: String,
      enum: ['PAYMENT_PENDING', 'MANUAL_SETTLEMENT', 'PAY_LATER', 'PAID'],
      default: 'PAYMENT_PENDING',
      index: true
    },
    city: { type: String, required: true },
    area: { type: String, required: true },
    pincode: { type: String, required: true },
    deliverySlotId: { type: String, required: true },
    deliverySlotLabel: { type: String, required: true },
    subtotal: { type: Number, required: true },
    subscriptionDiscount: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

orderSchema.index({ createdAt: -1 });

export type OrderDocument = InferSchemaType<typeof orderSchema>;
export const OrderModel = mongoose.model('Order', orderSchema);
