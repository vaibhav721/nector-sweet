import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    city: { type: String },
    area: { type: String },
    pincode: { type: String },
    subtotal: { type: Number, default: 0 },
    subscriptionDiscount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
);

export type CartDocument = InferSchemaType<typeof cartSchema>;
export const CartModel = mongoose.model('Cart', cartSchema);
