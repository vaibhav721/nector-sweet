import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { requireAuth, type AuthRequest } from '../middleware/auth.js';
import { CartItemModel, CartModel, InvoiceModel, OrderItemModel, OrderModel } from '../models/index.js';
import { getCurrentDbUser } from '../utils/currentUser.js';
import { HttpError } from '../utils/httpError.js';
import { ok } from '../utils/api.js';

export const orderRouter = Router();

orderRouter.use(requireAuth);

orderRouter.get(
  '/',
  asyncHandler(async (req: AuthRequest, res) => {
    const dbUser = await getCurrentDbUser(req);
    const orders = await OrderModel.find({ userId: dbUser._id }).sort({ createdAt: -1 });

    const payload = await Promise.all(
      orders.map(async (order) => {
        const items = await OrderItemModel.find({ orderId: order._id });
        return {
          ...order.toObject(),
          items
        };
      })
    );

    return ok(res, payload);
  })
);

orderRouter.get(
  '/:orderId',
  asyncHandler(async (req: AuthRequest, res) => {
    const dbUser = await getCurrentDbUser(req);
    const order = await OrderModel.findOne({ _id: req.params.orderId, userId: dbUser._id });

    if (!order) {
      throw new HttpError(404, 'NOT_FOUND', 'Order not found');
    }

    const items = await OrderItemModel.find({ orderId: order._id });
    const invoice = await InvoiceModel.findOne({ orderId: order._id });

    return ok(res, {
      ...order.toObject(),
      items,
      invoice
    });
  })
);

orderRouter.post(
  '/:orderId/reorder',
  asyncHandler(async (req: AuthRequest, res) => {
    const dbUser = await getCurrentDbUser(req);
    const order = await OrderModel.findOne({ _id: req.params.orderId, userId: dbUser._id });

    if (!order) {
      throw new HttpError(404, 'NOT_FOUND', 'Order not found');
    }

    let cart = await CartModel.findOne({ userId: dbUser._id });
    if (!cart) {
      cart = await CartModel.create({ userId: dbUser._id });
    }

    const orderItems = await OrderItemModel.find({ orderId: order._id });

    for (const item of orderItems) {
      const existing = await CartItemModel.findOne({
        cartId: cart._id,
        variantId: item.variantId,
        purchaseMode: item.purchaseMode
      });

      if (existing) {
        existing.quantity += item.quantity;
        await existing.save();
      } else {
        await CartItemModel.create({
          cartId: cart._id,
          productId: item.productId,
          variantId: item.variantId,
          productName: item.productName,
          variantName: item.variantName,
          quantity: item.quantity,
          purchaseMode: item.purchaseMode,
          unitPrice: item.unitPrice
        });
      }
    }

    return ok(res, { cartId: cart._id }, 'Reorder items added to cart');
  })
);
