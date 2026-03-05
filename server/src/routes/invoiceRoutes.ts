import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { requireAuth, type AuthRequest } from '../middleware/auth.js';
import { InvoiceModel, OrderModel } from '../models/index.js';
import { ok } from '../utils/api.js';
import { getCurrentDbUser } from '../utils/currentUser.js';
import { HttpError } from '../utils/httpError.js';

export const invoiceRouter = Router();

invoiceRouter.use(requireAuth);

invoiceRouter.get(
  '/',
  asyncHandler(async (req: AuthRequest, res) => {
    const dbUser = await getCurrentDbUser(req);
    const invoices = await InvoiceModel.find({ userId: dbUser._id }).sort({ issuedAt: -1 });
    return ok(res, invoices);
  })
);

invoiceRouter.get(
  '/:invoiceId',
  asyncHandler(async (req: AuthRequest, res) => {
    const dbUser = await getCurrentDbUser(req);
    const invoice = await InvoiceModel.findOne({ _id: req.params.invoiceId, userId: dbUser._id });

    if (!invoice) {
      throw new HttpError(404, 'NOT_FOUND', 'Invoice not found');
    }

    const order = await OrderModel.findById(invoice.orderId);
    return ok(res, {
      ...invoice.toObject(),
      order
    });
  })
);
