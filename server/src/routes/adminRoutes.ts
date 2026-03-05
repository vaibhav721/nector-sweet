import dayjs from 'dayjs';
import { Router } from 'express';
import { businessConfig, brandConfig } from '@nectar-sweet/shared';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';
import {
  AppSettingModel,
  CartItemModel,
  CategoryModel,
  ExpiryRecordModel,
  InventoryModel,
  OrderItemModel,
  OrderModel,
  ProductModel,
  ProductVariantModel,
  ServiceableAreaModel,
  ServiceableCityModel,
  ServiceablePincodeModel,
  SubscriptionModel,
  UserModel,
  WaitlistRequestModel
} from '../models/index.js';
import { ok } from '../utils/api.js';
import { HttpError } from '../utils/httpError.js';

export const adminRouter = Router();

adminRouter.use(requireAuth, requireAdmin);

adminRouter.get(
  '/dashboard',
  asyncHandler(async (_req, res) => {
    const start = dayjs().startOf('day').toDate();

    const [todaysDeliveries, activeSubscriptions, newUsers] = await Promise.all([
      OrderModel.countDocuments({ createdAt: { $gte: start } }),
      SubscriptionModel.countDocuments({ status: 'ACTIVE' }),
      UserModel.countDocuments({ role: 'customer', createdAt: { $gte: start } })
    ]);

    return ok(res, {
      todaysDeliveries,
      activeSubscriptions,
      newUsers
    });
  })
);

adminRouter.get(
  '/products',
  asyncHandler(async (_req, res) => {
    const products = await ProductModel.find().sort({ createdAt: -1 });
    const payload = await Promise.all(
      products.map(async (product) => {
        const variants = await ProductVariantModel.find({ productId: product._id });
        return {
          ...product.toObject(),
          variants
        };
      })
    );

    return ok(res, payload);
  })
);

adminRouter.post(
  '/products',
  asyncHandler(async (req, res) => {
    const { categoryId, type, name, slug, shortDescription, description, images, featured } = req.body;
    if (!categoryId || !type || !name || !slug || !shortDescription) {
      throw new HttpError(400, 'VALIDATION_ERROR', 'Missing required product fields');
    }

    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      throw new HttpError(404, 'CATEGORY_NOT_FOUND', 'Category not found');
    }

    const product = await ProductModel.create({
      categoryId,
      type,
      name,
      slug,
      shortDescription,
      description,
      images,
      featured
    });

    return ok(res, product, 'Product created');
  })
);

adminRouter.patch(
  '/products/:productId',
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findByIdAndUpdate(req.params.productId, req.body, { new: true });
    if (!product) {
      throw new HttpError(404, 'NOT_FOUND', 'Product not found');
    }

    return ok(res, product, 'Product updated');
  })
);

adminRouter.delete(
  '/products/:productId',
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findById(req.params.productId);
    if (!product) {
      throw new HttpError(404, 'NOT_FOUND', 'Product not found');
    }

    product.isActive = false;
    await product.save();

    await ProductVariantModel.updateMany({ productId: product._id }, { isActive: false });

    return ok(res, { id: product.id }, 'Product archived');
  })
);

adminRouter.post(
  '/products/:productId/variants',
  asyncHandler(async (req, res) => {
    const { sku, name, milkType, sizeLabel, oneTimePrice, subscriptionPrice, unitValue, unitType } = req.body;

    if (!sku || !name || !sizeLabel || !oneTimePrice || !subscriptionPrice || !unitValue || !unitType) {
      throw new HttpError(400, 'VALIDATION_ERROR', 'Missing required variant fields');
    }

    const product = await ProductModel.findById(req.params.productId);
    if (!product) {
      throw new HttpError(404, 'NOT_FOUND', 'Product not found');
    }

    const variant = await ProductVariantModel.create({
      productId: product._id,
      sku,
      name,
      milkType,
      sizeLabel,
      oneTimePrice,
      subscriptionPrice,
      unitValue,
      unitType
    });

    await InventoryModel.create({
      variantId: variant._id,
      availableQty: 100,
      reservedQty: 0,
      inStock: true
    });

    return ok(res, variant, 'Variant created');
  })
);

adminRouter.patch(
  '/variants/:variantId',
  asyncHandler(async (req, res) => {
    const variant = await ProductVariantModel.findByIdAndUpdate(req.params.variantId, req.body, { new: true });
    if (!variant) {
      throw new HttpError(404, 'NOT_FOUND', 'Variant not found');
    }

    return ok(res, variant, 'Variant updated');
  })
);

adminRouter.delete(
  '/variants/:variantId',
  asyncHandler(async (req, res) => {
    const variant = await ProductVariantModel.findById(req.params.variantId);
    if (!variant) {
      throw new HttpError(404, 'NOT_FOUND', 'Variant not found');
    }

    variant.isActive = false;
    variant.stockStatus = 'OUT_OF_STOCK';
    await variant.save();

    await InventoryModel.findOneAndUpdate({ variantId: variant._id }, { inStock: false });
    await CartItemModel.deleteMany({ variantId: variant._id });

    return ok(res, { id: variant.id }, 'Variant archived');
  })
);

adminRouter.get(
  '/stock',
  asyncHandler(async (_req, res) => {
    const stock = await InventoryModel.find().populate({
      path: 'variantId',
      populate: {
        path: 'productId',
        model: 'Product'
      }
    });

    return ok(res, stock);
  })
);

adminRouter.patch(
  '/stock/:variantId',
  asyncHandler(async (req, res) => {
    const { availableQty, reservedQty, inStock } = req.body;

    const stock = await InventoryModel.findOneAndUpdate(
      { variantId: req.params.variantId },
      {
        ...(availableQty !== undefined ? { availableQty: Number(availableQty) } : {}),
        ...(reservedQty !== undefined ? { reservedQty: Number(reservedQty) } : {}),
        ...(inStock !== undefined ? { inStock: Boolean(inStock) } : {})
      },
      { new: true }
    );

    if (!stock) {
      throw new HttpError(404, 'NOT_FOUND', 'Inventory not found');
    }

    return ok(res, stock, 'Stock updated');
  })
);

adminRouter.get(
  '/expiry',
  asyncHandler(async (_req, res) => {
    const records = await ExpiryRecordModel.find().sort({ expiryDate: 1 });
    return ok(res, records);
  })
);

adminRouter.post(
  '/expiry',
  asyncHandler(async (req, res) => {
    const { variantId, quantity, expiryDate, note } = req.body;
    if (!variantId || !quantity || !expiryDate) {
      throw new HttpError(400, 'VALIDATION_ERROR', 'variantId, quantity, expiryDate are required');
    }

    const record = await ExpiryRecordModel.create({
      variantId,
      quantity,
      expiryDate,
      note
    });

    return ok(res, record, 'Expiry record created');
  })
);

adminRouter.patch(
  '/expiry/:recordId',
  asyncHandler(async (req, res) => {
    const record = await ExpiryRecordModel.findByIdAndUpdate(req.params.recordId, req.body, {
      new: true
    });

    if (!record) {
      throw new HttpError(404, 'NOT_FOUND', 'Expiry record not found');
    }

    return ok(res, record, 'Expiry record updated');
  })
);

adminRouter.get(
  '/orders',
  asyncHandler(async (req, res) => {
    const status = req.query.status as string | undefined;
    const filters: Record<string, unknown> = {};

    if (status) {
      filters.status = status;
    }

    const orders = await OrderModel.find(filters).sort({ createdAt: -1 });
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

adminRouter.patch(
  '/orders/:orderId',
  asyncHandler(async (req, res) => {
    const { status, paymentStatus } = req.body;
    const order = await OrderModel.findById(req.params.orderId);
    if (!order) {
      throw new HttpError(404, 'NOT_FOUND', 'Order not found');
    }

    if (status) {
      order.status = status;
    }

    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }

    await order.save();
    return ok(res, order, 'Order updated');
  })
);

adminRouter.get(
  '/subscriptions',
  asyncHandler(async (_req, res) => {
    const subscriptions = await SubscriptionModel.find().sort({ createdAt: -1 });
    return ok(res, subscriptions);
  })
);

adminRouter.patch(
  '/subscriptions/:subscriptionId',
  asyncHandler(async (req, res) => {
    const subscription = await SubscriptionModel.findByIdAndUpdate(req.params.subscriptionId, req.body, {
      new: true
    });
    if (!subscription) {
      throw new HttpError(404, 'NOT_FOUND', 'Subscription not found');
    }

    return ok(res, subscription, 'Subscription updated');
  })
);

adminRouter.get(
  '/serviceability',
  asyncHandler(async (_req, res) => {
    const cities = await ServiceableCityModel.find();
    const areas = await ServiceableAreaModel.find();
    const pincodes = await ServiceablePincodeModel.find();

    return ok(res, {
      cities,
      areas,
      pincodes
    });
  })
);

adminRouter.post(
  '/serviceability/cities',
  asyncHandler(async (req, res) => {
    const city = await ServiceableCityModel.create(req.body);
    return ok(res, city, 'City created');
  })
);

adminRouter.post(
  '/serviceability/areas',
  asyncHandler(async (req, res) => {
    const area = await ServiceableAreaModel.create(req.body);
    return ok(res, area, 'Area created');
  })
);

adminRouter.post(
  '/serviceability/pincodes',
  asyncHandler(async (req, res) => {
    const pincode = await ServiceablePincodeModel.create(req.body);
    return ok(res, pincode, 'Pincode created');
  })
);

adminRouter.patch(
  '/serviceability/pincodes/:pincodeId',
  asyncHandler(async (req, res) => {
    const pincode = await ServiceablePincodeModel.findByIdAndUpdate(req.params.pincodeId, req.body, {
      new: true
    });

    if (!pincode) {
      throw new HttpError(404, 'NOT_FOUND', 'Pincode not found');
    }

    return ok(res, pincode, 'Pincode updated');
  })
);

adminRouter.delete(
  '/serviceability/pincodes/:pincodeId',
  asyncHandler(async (req, res) => {
    const pincode = await ServiceablePincodeModel.findById(req.params.pincodeId);
    if (!pincode) {
      throw new HttpError(404, 'NOT_FOUND', 'Pincode not found');
    }

    pincode.isActive = false;
    await pincode.save();

    return ok(res, pincode, 'Pincode archived');
  })
);

adminRouter.get(
  '/waitlist',
  asyncHandler(async (_req, res) => {
    const waitlist = await WaitlistRequestModel.find().sort({ createdAt: -1 });
    return ok(res, waitlist);
  })
);

adminRouter.patch(
  '/waitlist/:waitlistId',
  asyncHandler(async (req, res) => {
    const waitlist = await WaitlistRequestModel.findByIdAndUpdate(req.params.waitlistId, req.body, {
      new: true
    });

    if (!waitlist) {
      throw new HttpError(404, 'NOT_FOUND', 'Waitlist entry not found');
    }

    return ok(res, waitlist, 'Waitlist entry updated');
  })
);

adminRouter.get(
  '/users/new',
  asyncHandler(async (req, res) => {
    const days = Number(req.query.days || 7);
    const from = dayjs().subtract(days, 'day').startOf('day').toDate();

    const users = await UserModel.find({
      role: 'customer',
      createdAt: { $gte: from }
    }).sort({ createdAt: -1 });

    return ok(res, users);
  })
);

adminRouter.get(
  '/settings',
  asyncHandler(async (_req, res) => {
    const dynamicSettings = await AppSettingModel.find();

    return ok(res, {
      brandConfig,
      businessConfig,
      dynamicSettings
    });
  })
);

adminRouter.patch(
  '/settings/:key',
  asyncHandler(async (req, res) => {
    const setting = await AppSettingModel.findOneAndUpdate(
      { key: req.params.key },
      {
        key: req.params.key,
        value: req.body.value,
        description: req.body.description
      },
      {
        upsert: true,
        new: true
      }
    );

    return ok(res, setting, 'Setting saved');
  })
);
