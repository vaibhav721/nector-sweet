import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const productVariantSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
    sku: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    milkType: { type: String, enum: ['COW', 'BUFFALO'] },
    sizeLabel: { type: String, required: true },
    oneTimePrice: { type: Number, required: true },
    subscriptionPrice: { type: Number, required: true },
    unitValue: { type: Number, required: true },
    unitType: { type: String, enum: ['ML', 'L', 'G', 'KG'], required: true },
    stockStatus: { type: String, enum: ['IN_STOCK', 'OUT_OF_STOCK'], default: 'IN_STOCK' },
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
);

productVariantSchema.index({ productId: 1, isActive: 1 });

export type ProductVariantDocument = InferSchemaType<typeof productVariantSchema>;
export const ProductVariantModel = mongoose.model('ProductVariant', productVariantSchema);
