import { Router } from 'express';
import { adminRouter } from './adminRoutes.js';
import { authRouter } from './authRoutes.js';
import { cartRouter } from './cartRoutes.js';
import { catalogRouter } from './catalogRoutes.js';
import { checkoutRouter } from './checkoutRoutes.js';
import { invoiceRouter } from './invoiceRoutes.js';
import { orderRouter } from './orderRoutes.js';
import { serviceabilityRouter } from './serviceabilityRoutes.js';
import { subscriptionRouter } from './subscriptionRoutes.js';
import { waitlistRouter } from './waitlistRoutes.js';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/catalog', catalogRouter);
apiRouter.use('/serviceability', serviceabilityRouter);
apiRouter.use('/waitlist', waitlistRouter);
apiRouter.use('/cart', cartRouter);
apiRouter.use('/checkout', checkoutRouter);
apiRouter.use('/orders', orderRouter);
apiRouter.use('/invoices', invoiceRouter);
apiRouter.use('/subscriptions', subscriptionRouter);
apiRouter.use('/admin', adminRouter);
