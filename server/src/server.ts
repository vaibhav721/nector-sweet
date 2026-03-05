import { createApp } from './app.js';
import { connectDb } from './config/database.js';
import { env } from './config/env.js';
import { initFirebase } from './config/firebase.js';

const bootstrap = async () => {
  await connectDb();
  initFirebase();

  const app = createApp();

  app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on http://localhost:${env.port}`);
  });
};

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Boot failed', error);
  process.exit(1);
});
