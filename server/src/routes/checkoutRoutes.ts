import { Router } from 'express';
import { businessConfig } from '@nectar-sweet/shared';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { requireAuth, type AuthRequest } from '../middleware/auth.js';
import { CartItemModel } from '../models/CartItem.js';
import { getOrCreateCart } from '../services/cartService.js';
import { validateStockForCheckout, reserveAndConsumeInventory } from '../services/inventoryService.js';
import { createOrderFromCart } from '../services/orderService.js';
import { checkPincodeServiceability } from '../services/serviceabilityService.js';
import { ok } from '../utils/api.js';
import { getCurrentDbUser } from '../utils/currentUser.js';
import { HttpError } from '../utils/httpError.js';

export const checkoutRouter = Router();

checkoutRouter.use(requireAuth);

checkoutRouter.post(
  '/preview',
  asyncHandler(async (req: AuthRequest, res) => {
    const dbUser = await getCurrentDbUser(req);
    const cart = await getOrCreateCart(String(dbUser._id));
    const items = await CartItemModel.find({ cartId: cart._id });

    if (!items.length) {
      throw new HttpError(400, 'EMPTY_CART', 'Cart is empty');
    }

    if (!cart.pincode) {
      throw new HttpError(400, 'LOCATION_REQUIRED', 'Please select city, area and pincode');
    }

    const serviceability = await checkPincodeServiceability(cart.pincode);
    if (!serviceability.serviceable) {
      throw new HttpError(400, 'NOT_SERVICEABLE', serviceability.message);
    }

    const shortages = await validateStockForCheckout(
      items.map((item) => ({
        variantId: String(item.variantId),
        quantity: item.quantity,
        purchaseMode: item.purchaseMode
      }))
    );

    return ok(res, {
      cart,
      shortages,
      availableSlots: businessConfig.deliverySlots.filter((slot) => slot.isEnabled),
      paymentMode: {
        status: 'PAYMENT_PENDING',
        note: 'Online payment is not active yet. Manual settlement enabled for MVP.'
      }
    });
  })
);

checkoutRouter.post(
  '/place',
  asyncHandler(async (req: AuthRequest, res) => {
    const { deliverySlotId } = req.body;
    if (!deliverySlotId) {
      throw new HttpError(400, 'VALIDATION_ERROR', 'deliverySlotId is required');
    }

    const dbUser = await getCurrentDbUser(req);
    const cart = await getOrCreateCart(String(dbUser._id));
    const items = await CartItemModel.find({ cartId: cart._id });

    if (!items.length) {
      throw new HttpError(400, 'EMPTY_CART', 'Cart is empty');
    }

    if (!cart.city || !cart.area || !cart.pincode) {
      throw new HttpError(400, 'LOCATION_REQUIRED', 'Please set delivery location');
    }

    const serviceability = await checkPincodeServiceability(cart.pincode);
    if (!serviceability.serviceable) {
      throw new HttpError(400, 'NOT_SERVICEABLE', serviceability.message);
    }

    const slot = businessConfig.deliverySlots.find((entry) => entry.id === deliverySlotId && entry.isEnabled);
    if (!slot) {
      throw new HttpError(400, 'INVALID_SLOT', 'Selected delivery slot is not available');
    }

    await validateStockForCheckout(
      items.map((item) => ({
        variantId: String(item.variantId),
        quantity: item.quantity,
        purchaseMode: item.purchaseMode
      }))
    );

    await reserveAndConsumeInventory(
      items.map((item) => ({
        variantId: String(item.variantId),
        quantity: item.quantity,
        purchaseMode: item.purchaseMode
      })),
      String(dbUser._id)
    );

    const orderBundle = await createOrderFromCart(String(dbUser._id), {
      city: cart.city,
      area: cart.area,
      pincode: cart.pincode,
      deliverySlotId: slot.id,
      deliverySlotLabel: slot.label
    });

    return ok(
      res,
      {
        order: orderBundle.order,
        invoice: orderBundle.invoice,
        paymentStatus: orderBundle.order.paymentStatus,
        subscriptionsCreated: orderBundle.subscriptionsCreated
      },
      'Order placed successfully'
    );
  })
);
