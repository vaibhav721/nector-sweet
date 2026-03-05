import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  RecaptchaVerifier,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithPhoneNumber,
  signOut
} from 'firebase/auth';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
};

export const isFirebaseEnabled = Boolean(
  config.apiKey && config.authDomain && config.projectId && config.appId
);

const app = isFirebaseEnabled ? initializeApp(config) : null;

export const firebaseAuth = app ? getAuth(app) : null;
export const googleProvider = app ? new GoogleAuthProvider() : null;

export const firebaseClient = {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithPhoneNumber,
  signOut,
  RecaptchaVerifier
};
