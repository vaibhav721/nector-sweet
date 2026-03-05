import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { checkPincodeServiceability, getServiceabilityOptions } from '../services/serviceabilityService.js';
import { ok } from '../utils/api.js';

export const serviceabilityRouter = Router();

serviceabilityRouter.get(
  '/options',
  asyncHandler(async (_req, res) => {
    const options = await getServiceabilityOptions();
    return ok(res, options);
  })
);

serviceabilityRouter.get(
  '/check',
  asyncHandler(async (req, res) => {
    const pincode = String(req.query.pincode || '');
    const result = await checkPincodeServiceability(pincode);
    return ok(res, result);
  })
);
