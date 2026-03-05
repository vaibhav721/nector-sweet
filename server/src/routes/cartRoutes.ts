import { Router } from 'express';
import { addCartItemSchema } from '@nectar-sweet/shared';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { requireAuth, type AuthRequest } from '../middleware/auth.js';
import { CartItemModel, ProductModel, ProductVariantModel } from '../models/index.js';
import { getOrCreateCart, getCartPayload, recalculateCart } from '../services/cartService.js';
import { ok } from '../utils/api.js';
import { getCurrentDbUser } from '../utils/currentUser.js';
import { HttpError } from '../utils/httpError.js';

export const cartRouter = Router();

cartRouter.use(requireAuth);

cartRouter.get(
  '/',
  asyncHandler(async (req: AuthRequest, res) => {
    const dbUser = await getCurrentDbUser(req);
    const cart = await getOrCreateCart(String(dbUser._id));
    const payload = await getCartPayload(String(cart._id));
    return ok(res, payload);
  })
);

cartRouter.post(
  '/location',
  asyncHandler(async (req: AuthRequest, res) => {
    const { city, area, pincode } = req.body;
    if (!city || !area || !pincode) {
      throw new HttpError(400, 'VALIDATION_ERROR', 'city, area and pincode are required');
    }

    const dbUser = await getCurrentDbUser(req);
    const cart = await getOrCreateCart(String(dbUser._id));

    cart.city = city;
    cart.area = area;
    cart.pincode = pincode;
    await cart.save();

    const payload = await getCartPayload(String(cart._id));
    return ok(res, payload, 'Delivery location updated');
  })
);

cartRouter.post(
  '/items',
  asyncHandler(async (req: AuthRequest, res) => {
    const parsed = addCartItemSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new HttpError(400, 'VALIDATION_ERROR', 'Invalid cart payload', parsed.error.flatten());
    }

    const dbUser = await getCurrentDbUser(req);
    const cart = await getOrCreateCart(String(dbUser._id));

    const variant = await ProductVariantModel.findById(parsed.data.variantId);
    if (!variant || !variant.isActive) {
      throw new HttpError(404, 'VARIANT_NOT_FOUND', 'Variant not found');
    }

    const product = await ProductModel.findById(variant.productId);
    if (!product) {
      throw new HttpError(404, 'PRODUCT_NOT_FOUND', 'Product not found');
    }

    const unitPrice =
      parsed.data.purchaseMode === 'SUBSCRIPTION' ? variant.subscriptionPrice : variant.oneTimePrice;

    const existing = await CartItemModel.findOne({
      cartId: cart._id,
      variantId: variant._id,
      purchaseMode: parsed.data.purchaseMode
    });

    if (existing) {
      existing.quantity += parsed.data.quantity;
      if (parsed.data.purchaseMode === 'SUBSCRIPTION') {
        existing.frequency = parsed.data.frequency || existing.frequency || 'DAILY';
        existing.customDaysOfWeek = parsed.data.customDaysOfWeek || existing.customDaysOfWeek;
      }
      existing.unitPrice = unitPrice;
      await existing.save();
    } else {
      await CartItemModel.create({
        cartId: cart._id,
        productId: product._id,
        variantId: variant._id,
        productName: product.name,
        variantName: variant.name,
        quantity: parsed.data.quantity,
        purchaseMode: parsed.data.purchaseMode,
        unitPrice,
        frequency: parsed.data.frequency,
        customDaysOfWeek: parsed.data.customDaysOfWeek
      });
    }

    await recalculateCart(String(cart._id));
    const payload = await getCartPayload(String(cart._id));
    return ok(res, payload, 'Item added to cart');
  })
);

cartRouter.patch(
  '/items/:itemId',
  asyncHandler(async (req: AuthRequest, res) => {
    const { quantity, frequency, customDaysOfWeek } = req.body;

    const dbUser = await getCurrentDbUser(req);
    const cart = await getOrCreateCart(String(dbUser._id));

    const item = await CartItemModel.findOne({ _id: req.params.itemId, cartId: cart._id });
    if (!item) {
      throw new HttpError(404, 'NOT_FOUND', 'Cart item not found');
    }

    if (quantity !== undefined) {
      item.quantity = Number(quantity);
    }

    if (item.purchaseMode === 'SUBSCRIPTION') {
      if (frequency) {
        item.frequency = frequency;
      }
      if (customDaysOfWeek) {
        item.customDaysOfWeek = customDaysOfWeek;
      }
    }

    await item.save();
    await recalculateCart(String(cart._id));

    const payload = await getCartPayload(String(cart._id));
    return ok(res, payload, 'Cart item updated');
  })
);

cartRouter.delete(
  '/items/:itemId',
  asyncHandler(async (req: AuthRequest, res) => {
    const dbUser = await getCurrentDbUser(req);
    const cart = await getOrCreateCart(String(dbUser._id));

    await CartItemModel.deleteOne({ _id: req.params.itemId, cartId: cart._id });
    await recalculateCart(String(cart._id));
    const payload = await getCartPayload(String(cart._id));

    return ok(res, payload, 'Item removed');
  })
);
