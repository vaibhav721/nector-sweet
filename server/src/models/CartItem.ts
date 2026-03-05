import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const cartItemSchema = new Schema(
  {
    cartId: { type: Schema.Types.ObjectId, ref: 'Cart', required: true, index: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    variantId: { type: Schema.Types.ObjectId, ref: 'ProductVariant', required: true, index: true },
    productName: { type: String, required: true },
    variantName: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    purchaseMode: {
      type: String,
      enum: ['ONE_TIME', 'SUBSCRIPTION'],
      required: true
    },
    unitPrice: { type: Number, required: true },
    frequency: { type: String, enum: ['DAILY', 'ALTERNATE_DAY', 'CUSTOM'] },
    customDaysOfWeek: { type: [Number], default: [] }
  },
  {
    timestamps: true
  }
);

cartItemSchema.index({ cartId: 1, variantId: 1, purchaseMode: 1 }, { unique: true });

export type CartItemDocument = InferSchemaType<typeof cartItemSchema>;
export const CartItemModel = mongoose.model('CartItem', cartItemSchema);
