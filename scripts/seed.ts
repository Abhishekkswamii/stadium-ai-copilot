/**
 * Seed script to populate Firestore with mock data from src/lib/data/mock.ts.
 * Uses Firebase Admin SDK. Run via: npx tsx scripts/seed.ts
 */
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import * as path from "path";
import * as dotenv from "dotenv";

// Load environment variables from .env.local if present
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import { COLLECTIONS } from "../src/constants";
import { MOCK_STADIUM, MOCK_MATCH, MOCK_INCIDENTS, MOCK_ALERTS } from "../src/lib/data/mock";

// Initialize Firebase Admin
if (getApps().length === 0) {
  // If FIREBASE_SERVICE_ACCOUNT_B64 is available, use it (from .env)
  const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_B64;
  if (b64) {
    const serviceAccount = JSON.parse(Buffer.from(b64, "base64").toString("utf-8"));
    initializeApp({
      credential: cert(serviceAccount),
    });
  } else {
    // Fallback to application default credentials (ADC)
    initializeApp();
  }
}

const db = getFirestore();

async function seed() {
  console.log("🌱 Seeding Firestore with Stadium AI Copilot data...");

  const batch = db.batch();

  // 1. Stadium
  const stadiumRef = db.collection(COLLECTIONS.STADIUMS).doc(MOCK_STADIUM.id);
  batch.set(stadiumRef, MOCK_STADIUM);
  console.log(`- Added stadium: ${MOCK_STADIUM.id}`);

  // 2. Match
  const matchRef = db.collection(COLLECTIONS.MATCHES).doc(MOCK_MATCH.id);
  batch.set(matchRef, MOCK_MATCH);
  console.log(`- Added match: ${MOCK_MATCH.id}`);

  // 3. Incidents
  for (const incident of MOCK_INCIDENTS) {
    const incRef = db.collection(COLLECTIONS.INCIDENTS).doc(incident.id);
    batch.set(incRef, incident);
  }
  console.log(`- Added ${MOCK_INCIDENTS.length} incidents`);

  // 4. Alerts
  for (const alert of MOCK_ALERTS) {
    const alertRef = db.collection(COLLECTIONS.ALERTS).doc(alert.id);
    batch.set(alertRef, alert);
  }
  console.log(`- Added ${MOCK_ALERTS.length} alerts`);

  // Note: Crowd status, gates, and weather are embedded in the stadium or match, or generated in real-time.
  // We'll leave them to be simulated or kept as static UI mock data (since they aren't in Firestore collections yet per rules).
  // Wait, the Prompt 6 rules said: "Keep existing UI unchanged".
  // The MOCK_CROWD_STATUS, MOCK_GATES, MOCK_WEATHER are not in collections, so we will still use the mock data for those cards, but we'll fetch them from Firestore if they are supposed to be there.
  // Let's assume they are nested in the stadium or match if needed, but for now we'll stick to the defined collections.

  await batch.commit();
  console.log("✅ Seeding complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
