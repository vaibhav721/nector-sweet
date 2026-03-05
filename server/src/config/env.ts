import dotenv from 'dotenv';

dotenv.config();

const required = ['MONGODB_URI'];
for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGODB_URI as string,
  webOrigin: process.env.WEB_ORIGIN || 'http://localhost:5173',
  mobileOrigin: process.env.MOBILE_ORIGIN || 'exp://127.0.0.1:8081',
  jwtDevBypass: process.env.JWT_DEV_BYPASS === 'true' || process.env.JWT_DEV_BYPASS === '1',
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
  firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
};
