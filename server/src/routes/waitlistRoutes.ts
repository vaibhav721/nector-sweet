import { Router } from 'express';
import { waitlistSchema } from '@nectar-sweet/shared';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { WaitlistRequestModel } from '../models/WaitlistRequest.js';
import { created } from '../utils/api.js';
import { HttpError } from '../utils/httpError.js';

export const waitlistRouter = Router();

waitlistRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const parsed = waitlistSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new HttpError(400, 'VALIDATION_ERROR', 'Invalid waitlist payload', parsed.error.flatten());
    }

    const request = await WaitlistRequestModel.create(parsed.data);
    return created(
      res,
      {
        id: request.id,
        status: request.status
      },
      'Thanks, we have added your request.'
    );
  })
);
