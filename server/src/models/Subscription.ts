import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const subscriptionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', index: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    variantId: { type: Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
    quantity: { type: Number, required: true, min: 1 },
    frequency: { type: String, enum: ['DAILY', 'ALTERNATE_DAY', 'CUSTOM'], required: true },
    customDaysOfWeek: { type: [Number], default: [] },
    status: { type: String, enum: ['ACTIVE', 'PAUSED', 'CANCELLED'], default: 'ACTIVE', index: true },
    startDate: { type: Date, required: true },
    nextDeliveryDate: { type: Date, required: true },
    pauseFrom: { type: Date },
    pauseUntil: { type: Date }
  },
  {
    timestamps: true
  }
);

subscriptionSchema.index({ userId: 1, status: 1 });

export type SubscriptionDocument = InferSchemaType<typeof subscriptionSchema>;
export const SubscriptionModel = mongoose.model('Subscription', subscriptionSchema);
