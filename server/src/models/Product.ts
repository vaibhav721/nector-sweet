import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const productSchema = new Schema(
  {
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
    type: {
      type: String,
      enum: ['MILK', 'CURD', 'PANEER', 'GHEE'],
      required: true,
      index: true
    },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    shortDescription: { type: String, required: true },
    description: { type: String },
    images: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
);

export type ProductDocument = InferSchemaType<typeof productSchema>;
export const ProductModel = mongoose.model('Product', productSchema);
