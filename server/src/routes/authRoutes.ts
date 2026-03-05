import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { requireAuth, type AuthRequest } from '../middleware/auth.js';
import { UserModel } from '../models/User.js';
import { upsertUserFromAuth } from '../services/userService.js';
import { ok } from '../utils/api.js';

export const authRouter = Router();

authRouter.post(
  '/sync',
  requireAuth,
  asyncHandler(async (req: AuthRequest, res) => {
    const user = await upsertUserFromAuth({
      firebaseUid: req.user!.firebaseUid,
      email: req.user?.email,
      phone: req.user?.phone,
      role: req.user?.role || 'customer'
    });

    return ok(
      res,
      {
        id: user.id,
        firebaseUid: user.firebaseUid,
        name: user.name,
        role: user.role,
        email: user.email,
        phone: user.phone
      },
      'User profile synced'
    );
  })
);

authRouter.get(
  '/me',
  requireAuth,
  asyncHandler(async (req: AuthRequest, res) => {
    const user = await UserModel.findOne({ firebaseUid: req.user!.firebaseUid });
    return ok(res, user);
  })
);
