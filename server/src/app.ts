import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { env } from './config/env.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { apiRouter } from './routes/index.js';

export const createApp = () => {
  const app = express();

  app.use(
    cors({
      origin: [env.webOrigin, env.mobileOrigin],
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

  app.use('/api', apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
