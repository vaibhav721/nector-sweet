import admin from 'firebase-admin';
import { env } from './env.js';

let initialized = false;

export const initFirebase = () => {
  if (initialized) {
    return;
  }

  if (env.firebaseProjectId && env.firebaseClientEmail && env.firebasePrivateKey) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: env.firebaseProjectId,
        clientEmail: env.firebaseClientEmail,
        privateKey: env.firebasePrivateKey
      })
    });
    initialized = true;
  }
};

export const verifyFirebaseToken = async (token: string) => {
  if (!admin.apps.length) {
    return null;
  }

  return admin.auth().verifyIdToken(token);
};
