import type { NextFunction, Request, Response } from 'express';
import type { UserRole } from '@nectar-sweet/shared';
import { env } from '../config/env.js';
import { verifyFirebaseToken } from '../config/firebase.js';
import { HttpError } from '../utils/httpError.js';

interface AuthRequest extends Request {
  user?: {
    firebaseUid: string;
    email?: string;
    phone?: string;
    role: UserRole;
  };
}

const parseBearer = (authHeader?: string) => {
  if (!authHeader) {
    return null;
  }

  const [type, token] = authHeader.split(' ');
  if (type !== 'Bearer' || !token) {
    return null;
  }

  return token;
};

const normalizeRole = (role?: string): UserRole => {
  if (role === 'admin' || role === 'customer' || role === 'guest') {
    return role;
  }
  return 'customer';
};

export const requireAuth = async (req: AuthRequest, _res: Response, next: NextFunction) => {
  try {
    const devRole = normalizeRole(req.header('x-dev-role') || undefined);
    const devUid = req.header('x-dev-uid') || 'dev-user';
    const authHeader = req.header('authorization');
    const token = parseBearer(authHeader);

    if (token) {
      const decoded = await verifyFirebaseToken(token);
      if (!decoded) {
        return next(new HttpError(401, 'AUTH_INVALID', 'Unable to validate token'));
      }

      const tokenRole: UserRole = (decoded as any)?.admin === true ? 'admin' : 'customer';

      req.user = {
        firebaseUid: decoded.uid,
        email: decoded.email,
        phone: decoded.phone_number,
        role: env.jwtDevBypass ? devRole : tokenRole
      };
      return next();
    }

    if (env.jwtDevBypass) {
      req.user = {
        firebaseUid: devUid,
        role: devRole,
        email: req.header('x-dev-email') || undefined,
        phone: req.header('x-dev-phone') || undefined
      };
      return next();
    }

    return next(new HttpError(401, 'AUTH_REQUIRED', 'Login required'));
  } catch (error) {
    return next(error);
  }
};

export const requireAdmin = (req: AuthRequest, _res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new HttpError(401, 'AUTH_REQUIRED', 'Login required'));
  }

  if (req.user.role !== 'admin') {
    return next(new HttpError(403, 'FORBIDDEN', 'Admin access required'));
  }

  return next();
};

export type { AuthRequest };
