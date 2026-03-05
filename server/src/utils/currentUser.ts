import type { AuthRequest } from '../middleware/auth.js';
import { UserModel } from '../models/User.js';
import { HttpError } from './httpError.js';

export const getCurrentDbUser = async (req: AuthRequest) => {
  if (!req.user) {
    throw new HttpError(401, 'AUTH_REQUIRED', 'Login required');
  }

  const user = await UserModel.findOne({ firebaseUid: req.user.firebaseUid });
  if (!user) {
    throw new HttpError(401, 'USER_NOT_FOUND', 'User profile not found. Please sync auth first.');
  }

  return user;
};
