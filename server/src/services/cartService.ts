import { CartItemModel, CartModel } from '../models/index.js';
import { calculateCartTotals } from '../utils/totals.js';

export const getOrCreateCart = async (userId: string) => {
  let cart = await CartModel.findOne({ userId });
  if (!cart) {
    cart = await CartModel.create({ userId });
  }
  return cart;
};

export const recalculateCart = async (cartId: string) => {
  const [cart, items] = await Promise.all([
    CartModel.findById(cartId),
    CartItemModel.find({ cartId })
  ]);

  if (!cart) {
    return null;
  }

  const totals = calculateCartTotals(
    items.map((item) => ({
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      isSubscription: item.purchaseMode === 'SUBSCRIPTION'
    }))
  );

  cart.subtotal = totals.subtotal;
  cart.subscriptionDiscount = totals.subscriptionDiscount;
  cart.tax = totals.tax;
  cart.total = totals.total;
  await cart.save();

  return {
    cart,
    items
  };
};

export const getCartPayload = async (cartId: string) => {
  const recalculated = await recalculateCart(cartId);
  if (!recalculated) {
    return null;
  }

  const { cart, items } = recalculated;

  return {
    id: cart.id,
    city: cart.city,
    area: cart.area,
    pincode: cart.pincode,
    subtotal: cart.subtotal,
    subscriptionDiscount: cart.subscriptionDiscount,
    tax: cart.tax,
    total: cart.total,
    updatedAt: cart.updatedAt,
    items: items.map((item) => ({
      id: item.id,
      productId: String(item.productId),
      variantId: String(item.variantId),
      productName: item.productName,
      variantName: item.variantName,
      quantity: item.quantity,
      purchaseMode: item.purchaseMode,
      unitPrice: item.unitPrice,
      frequency: item.frequency,
      customDaysOfWeek: item.customDaysOfWeek
    }))
  };
};
