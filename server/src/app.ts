import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { env } from './config/env.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { apiRouter } from './routes/index.js';

export const createApp = () => {
  const app = express();
  const localOriginRegex = /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/;
  const allowlist = new Set([env.webOrigin, env.mobileOrigin]);

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin) {
          return callback(null, true);
        }

        if (allowlist.has(origin) || localOriginRegex.test(origin) || origin.startsWith('exp://')) {
          return callback(null, true);
        }

        return callback(new Error(`Origin not allowed by CORS: ${origin}`));
      },
      credentials: true
    })
  );
  app.use(express.json({ limit: '1mb' }));
  app.use(morgan('dev'));

  app.get('/health', (_req, res) => {
    res.json({
      success: true,
      data: {
        name: 'nectar-sweet-api',
        status: 'ok'
      }
    });
  });

  // Serve static files (like placeholder images)
  app.use(express.static('public'));

  app.use('/api', apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
