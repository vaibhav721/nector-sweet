import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const orderItemSchema = new Schema(
  {
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true, index: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    variantId: { type: Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
    subscriptionId: { type: Schema.Types.ObjectId, ref: 'Subscription' },
    purchaseMode: { type: String, enum: ['ONE_TIME', 'SUBSCRIPTION'], required: true },
    productName: { type: String, required: true },
    variantName: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    lineTotal: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

orderItemSchema.index({ orderId: 1, purchaseMode: 1 });

export type OrderItemDocument = InferSchemaType<typeof orderItemSchema>;
export const OrderItemModel = mongoose.model('OrderItem', orderItemSchema);
