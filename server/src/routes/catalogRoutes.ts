import { Router } from 'express';
import { CategoryModel, InventoryModel, ProductModel, ProductVariantModel } from '../models/index.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { ok } from '../utils/api.js';

export const catalogRouter = Router();

catalogRouter.get(
  '/categories',
  asyncHandler(async (_req, res) => {
    const categories = await CategoryModel.find({ isActive: true }).sort({ sortOrder: 1, name: 1 });
    return ok(res, categories);
  })
);

catalogRouter.get(
  '/products',
  asyncHandler(async (req, res) => {
    const { categoryId, featured, search } = req.query;

    const filters: Record<string, unknown> = {
      isActive: true
    };

    if (categoryId) {
      filters.categoryId = String(categoryId);
    }

    if (featured === 'true') {
      filters.featured = true;
    }

    if (search) {
      filters.name = { $regex: String(search), $options: 'i' };
    }

    const products = await ProductModel.find(filters).sort({ createdAt: -1 });

    const data = await Promise.all(
      products.map(async (product) => {
        const variants = await ProductVariantModel.find({ productId: product._id, isActive: true });
        return {
          ...product.toObject(),
          variants
        };
      })
    );

    return ok(res, data);
  })
);

catalogRouter.get(
  '/products/:slug',
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findOne({ slug: req.params.slug, isActive: true });
    if (!product) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Product not found' } });
    }

    const variants = await ProductVariantModel.find({ productId: product._id, isActive: true });
    const inventories = await InventoryModel.find({ variantId: { $in: variants.map((item) => item._id) } });

    const inventoryByVariant = new Map(inventories.map((item) => [String(item.variantId), item]));

    return ok(res, {
      ...product.toObject(),
      variants: variants.map((variant) => ({
        ...variant.toObject(),
        inventory: inventoryByVariant.get(String(variant._id))
      }))
    });
  })
);
