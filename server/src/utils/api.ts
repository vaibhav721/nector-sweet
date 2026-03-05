import type { Response } from 'express';

export const ok = <T>(res: Response, data: T, message?: string) => {
  return res.json({
    success: true,
    data,
    message
  });
};

export const created = <T>(res: Response, data: T, message?: string) => {
  return res.status(201).json({
    success: true,
    data,
    message
  });
};
