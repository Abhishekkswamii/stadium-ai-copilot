import { collection, doc, setDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { createConverter } from "@/lib/firebase/converters";
import { COLLECTIONS } from "@/constants";
import type { Incident } from "@/types";

const incidentConverter = createConverter<Incident>();

export type CreateIncidentData = Omit<
  Incident,
  "id" | "createdAt" | "updatedAt" | "aiAnalysis" | "resolvedAt"
>;

export type UpdateIncidentData = Partial<Omit<Incident, "id" | "createdAt" | "updatedAt">>;

/**
 * Creates a new incident in Firestore.
 * Automatically generates an ID and sets timestamps.
 */
export async function createIncident(data: CreateIncidentData): Promise<string> {
  const collectionRef = collection(db, COLLECTIONS.INCIDENTS);
  const docRef = doc(collectionRef).withConverter(incidentConverter);

  const newIncident: Omit<Incident, "id"> = {
    ...data,
    aiAnalysis: null,
    resolvedAt: data.status === "resolved" ? new Date() : null,
    // @ts-expect-error - serverTimestamp is compatible with FirestoreDataConverter but TS strict types complain with Date
    createdAt: serverTimestamp(),
    // @ts-expect-error - same issue with Date vs FieldValue
    updatedAt: serverTimestamp(),
  };

  await setDoc(docRef, newIncident as unknown as Incident);
  return docRef.id;
}

/**
 * Updates an existing incident in Firestore.
 * Automatically updates the updatedAt timestamp.
 */
export async function updateIncident(id: string, data: UpdateIncidentData): Promise<void> {
  const docRef = doc(db, COLLECTIONS.INCIDENTS, id).withConverter(incidentConverter);

  const updatePayload: Record<string, unknown> = { ...data };

  // If status is being updated to resolved, set resolvedAt
  if (data.status === "resolved" && !data.resolvedAt) {
    updatePayload.resolvedAt = serverTimestamp();
  }

  // Update timestamp
  updatePayload.updatedAt = serverTimestamp();

  await updateDoc(docRef, updatePayload);
}

/**
 * Deletes an incident from Firestore.
 */
export async function deleteIncident(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.INCIDENTS, id);
  await deleteDoc(docRef);
}
