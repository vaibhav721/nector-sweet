import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
);

export type CategoryDocument = InferSchemaType<typeof categorySchema>;
export const CategoryModel = mongoose.model('Category', categorySchema);
