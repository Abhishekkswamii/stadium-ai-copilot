import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { env } from "@/env";

/**
 * Firebase Web SDK client configuration.
 * Initialized once (singleton via getApps() guard).
 * Only contains public, client-safe Firebase config.
 */
const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // Only spread measurementId when defined (exactOptionalPropertyTypes)
  ...(env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID && {
    measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  }),
};

// Prevent re-initialization in hot-reload development
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
