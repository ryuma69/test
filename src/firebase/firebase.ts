import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

// Guard against missing API key so the error is actionable and occurs early.
if (!firebaseConfig.apiKey) {
  throw new Error(
    'Missing NEXT_PUBLIC_FIREBASE_API_KEY. Add it to your .env.local or environment and restart the dev server.'
  );
}

// Initialize Firebase safely and export the services
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const firebaseApp = app;
