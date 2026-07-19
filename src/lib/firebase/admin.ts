import "server-only"; // Prevents this module from being imported in client bundles

import * as adminApp from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { env } from "@/env";

/**
 * Firebase Admin SDK — SERVER ONLY.
 * The `server-only` import at the top will cause a build error
 * if this module is ever accidentally imported from a client component.
 */

function getAdminApp(): adminApp.App {
  // Return existing app if already initialized
  const existingApps = adminApp.getApps();
  if (existingApps.length > 0) {
    return existingApps[0] as adminApp.App;
  }

  // Option A: service account as base64-encoded JSON (preferred for deployment)
  if (env.FIREBASE_SERVICE_ACCOUNT_B64) {
    const serviceAccount = JSON.parse(
      Buffer.from(env.FIREBASE_SERVICE_ACCOUNT_B64, "base64").toString("utf-8")
    ) as adminApp.ServiceAccount;

    return adminApp.initializeApp({
      credential: adminApp.cert(serviceAccount),
      storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  }

  // Option B: application default credentials (local dev with ADC / Cloud Run)
  return adminApp.initializeApp({
    credential: adminApp.applicationDefault(),
    projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

const adminInstance = getAdminApp();

export const adminAuth = getAuth(adminInstance);
export const adminDb = getFirestore(adminInstance);
export const adminStorage = getStorage(adminInstance);

export default adminInstance;
