import dayjs from 'dayjs';
import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { requireAuth, type AuthRequest } from '../middleware/auth.js';
import { SubscriptionModel, SubscriptionScheduleModel } from '../models/index.js';
import { computeNextDeliveryDate } from '../utils/subscription.js';
import { ok } from '../utils/api.js';
import { getCurrentDbUser } from '../utils/currentUser.js';
import { HttpError } from '../utils/httpError.js';

export const subscriptionRouter = Router();

subscriptionRouter.use(requireAuth);

subscriptionRouter.get(
  '/',
  asyncHandler(async (req: AuthRequest, res) => {
    const dbUser = await getCurrentDbUser(req);
    const subscriptions = await SubscriptionModel.find({ userId: dbUser._id }).sort({ createdAt: -1 });
    return ok(res, subscriptions);
  })
);

subscriptionRouter.patch(
  '/:subscriptionId',
  asyncHandler(async (req: AuthRequest, res) => {
    const dbUser = await getCurrentDbUser(req);
    const subscription = await SubscriptionModel.findOne({
      _id: req.params.subscriptionId,
      userId: dbUser._id
    });

    if (!subscription) {
      throw new HttpError(404, 'NOT_FOUND', 'Subscription not found');
    }

    const { quantity, frequency, customDaysOfWeek, status } = req.body;

    if (quantity !== undefined) {
      subscription.quantity = Number(quantity);
    }

    if (frequency) {
      subscription.frequency = frequency;
      subscription.customDaysOfWeek = customDaysOfWeek || subscription.customDaysOfWeek;
      subscription.nextDeliveryDate = computeNextDeliveryDate(new Date(), frequency, customDaysOfWeek);
    }

    if (status) {
      subscription.status = status;
    }

    await subscription.save();
    return ok(res, subscription, 'Subscription updated');
  })
);

subscriptionRouter.post(
  '/:subscriptionId/skip',
  asyncHandler(async (req: AuthRequest, res) => {
    const dbUser = await getCurrentDbUser(req);
    const subscription = await SubscriptionModel.findOne({
      _id: req.params.subscriptionId,
      userId: dbUser._id
    });

    if (!subscription) {
      throw new HttpError(404, 'NOT_FOUND', 'Subscription not found');
    }

    const date = req.body.date || dayjs().add(1, 'day').format('YYYY-MM-DD');

    const override = await SubscriptionScheduleModel.create({
      subscriptionId: subscription._id,
      date,
      action: 'SKIP',
      note: 'User requested skip day'
    });

    return ok(res, override, 'Delivery skipped for selected day');
  })
);

subscriptionRouter.post(
  '/:subscriptionId/extra',
  asyncHandler(async (req: AuthRequest, res) => {
    const dbUser = await getCurrentDbUser(req);
    const subscription = await SubscriptionModel.findOne({
      _id: req.params.subscriptionId,
      userId: dbUser._id
    });

    if (!subscription) {
      throw new HttpError(404, 'NOT_FOUND', 'Subscription not found');
    }

    const { date, extraQuantity } = req.body;
    if (!date || !extraQuantity) {
      throw new HttpError(400, 'VALIDATION_ERROR', 'date and extraQuantity are required');
    }

    const override = await SubscriptionScheduleModel.create({
      subscriptionId: subscription._id,
      date,
      action: 'EXTRA_QUANTITY',
      extraQuantity
    });

    return ok(res, override, 'Extra quantity scheduled');
  })
);

subscriptionRouter.post(
  '/:subscriptionId/pause',
  asyncHandler(async (req: AuthRequest, res) => {
    const dbUser = await getCurrentDbUser(req);
    const subscription = await SubscriptionModel.findOne({
      _id: req.params.subscriptionId,
      userId: dbUser._id
    });

    if (!subscription) {
      throw new HttpError(404, 'NOT_FOUND', 'Subscription not found');
    }

    const { from, until } = req.body;
    if (!from || !until) {
      throw new HttpError(400, 'VALIDATION_ERROR', 'from and until are required');
    }

    subscription.status = 'PAUSED';
    subscription.pauseFrom = new Date(from);
    subscription.pauseUntil = new Date(until);
    await subscription.save();

    return ok(res, subscription, 'Subscription paused');
  })
);
