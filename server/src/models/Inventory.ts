import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const inventorySchema = new Schema(
  {
    variantId: { type: Schema.Types.ObjectId, ref: 'ProductVariant', required: true, unique: true, index: true },
    availableQty: { type: Number, default: 0 },
    reservedQty: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true },
    lowStockThreshold: { type: Number, default: 10 }
  },
  {
    timestamps: true
  }
);

export type InventoryDocument = InferSchemaType<typeof inventorySchema>;
export const InventoryModel = mongoose.model('Inventory', inventorySchema);
