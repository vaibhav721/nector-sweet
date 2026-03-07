import { z } from 'zod';
export const waitlistSchema = z.object({
    name: z.string().min(2),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    city: z.string().min(2),
    area: z.string().min(2),
    pincode: z.string().length(6)
});
export const addCartItemSchema = z.object({
    variantId: z.string(),
    quantity: z.number().min(1),
    purchaseMode: z.enum(['ONE_TIME', 'SUBSCRIPTION']),
    frequency: z.enum(['DAILY', 'ALTERNATE_DAY', 'CUSTOM']).optional(),
    customDaysOfWeek: z.array(z.number().min(0).max(6)).optional()
});
