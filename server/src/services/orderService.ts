import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import {
  CartItemModel,
  CartModel,
  InvoiceModel,
  OrderItemModel,
  OrderModel,
  ProductVariantModel,
  SubscriptionModel
} from '../models/index.js';
import { computeNextDeliveryDate } from '../utils/subscription.js';

export const createOrderFromCart = async (
  userId: string,
  options: {
    city: string;
    area: string;
    pincode: string;
    deliverySlotId: string;
    deliverySlotLabel: string;
  }
) => {
  const cart = await CartModel.findOne({ userId });
  if (!cart) {
    throw new Error('Cart not found');
  }

  const items = await CartItemModel.find({ cartId: cart._id });
  if (!items.length) {
    throw new Error('Cart is empty');
  }

  const order = await OrderModel.create({
    userId,
    orderNumber: `NS-${dayjs().format('YYYYMMDD')}-${nanoid(6).toUpperCase()}`,
    paymentStatus: 'PAYMENT_PENDING',
    status: 'PLACED',
    city: options.city,
    area: options.area,
    pincode: options.pincode,
    deliverySlotId: options.deliverySlotId,
    deliverySlotLabel: options.deliverySlotLabel,
    subtotal: cart.subtotal,
    subscriptionDiscount: cart.subscriptionDiscount,
    tax: cart.tax,
    total: cart.total
  });

  const orderItemsToCreate = [];
  const createdSubscriptionIds: string[] = [];

  for (const item of items) {
    let subscriptionId: string | undefined;

    if (item.purchaseMode === 'SUBSCRIPTION') {
      const subscription = await SubscriptionModel.create({
        userId,
        orderId: order._id,
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        frequency: item.frequency || 'DAILY',
        customDaysOfWeek: item.customDaysOfWeek,
        startDate: new Date(),
        nextDeliveryDate: computeNextDeliveryDate(new Date(), item.frequency || 'DAILY', item.customDaysOfWeek)
      });

      subscriptionId = String(subscription._id);
      createdSubscriptionIds.push(subscriptionId);
    }

    orderItemsToCreate.push({
      orderId: order._id,
      productId: item.productId,
      variantId: item.variantId,
      subscriptionId,
      purchaseMode: item.purchaseMode,
      productName: item.productName,
      variantName: item.variantName,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      lineTotal: item.unitPrice * item.quantity
    });
  }

  await OrderItemModel.insertMany(orderItemsToCreate);

  const invoice = await InvoiceModel.create({
    userId,
    orderId: order._id,
    invoiceNumber: `INV-${dayjs().format('YYYYMMDD')}-${nanoid(6).toUpperCase()}`,
    subtotal: cart.subtotal,
    tax: cart.tax,
    total: cart.total,
    status: 'ISSUED'
  });

  await CartItemModel.deleteMany({ cartId: cart._id });
  cart.subtotal = 0;
  cart.subscriptionDiscount = 0;
  cart.tax = 0;
  cart.total = 0;
  await cart.save();

  const orderItems = await OrderItemModel.find({ orderId: order._id });
  const variants = await ProductVariantModel.find({
    _id: { $in: orderItems.map((item) => item.variantId) }
  });

  return {
    order,
    orderItems,
    invoice,
    subscriptionsCreated: createdSubscriptionIds.length,
    variants
  };
};
