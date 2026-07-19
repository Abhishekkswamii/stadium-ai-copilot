import {
  type DocumentData,
  type FirestoreDataConverter,
  type QueryDocumentSnapshot,
  type SnapshotOptions,
  Timestamp,
} from "firebase/firestore";

/**
 * Generic helper to handle Firestore Timestamp to Date conversions
 */
function convertTimestampToDate(data: DocumentData): DocumentData {
  const result: DocumentData = {};
  for (const [key, value] of Object.entries(data)) {
    if (value instanceof Timestamp) {
      result[key] = value.toDate();
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      result[key] = convertTimestampToDate(value as DocumentData);
    } else if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        item instanceof Timestamp
          ? item.toDate()
          : item && typeof item === "object"
            ? convertTimestampToDate(item as DocumentData)
            : item
      );
    } else {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Generic helper to handle Date to Firestore Timestamp conversions
 */
function convertDateToTimestamp(data: Partial<unknown>): DocumentData {
  const result: DocumentData = {};
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    if (value instanceof Date) {
      result[key] = Timestamp.fromDate(value);
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      result[key] = convertDateToTimestamp(value as Partial<unknown>);
    } else if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        item instanceof Date
          ? Timestamp.fromDate(item)
          : item && typeof item === "object"
            ? convertDateToTimestamp(item as Partial<unknown>)
            : item
      );
    } else {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Creates a generic Firestore data converter for any type T
 */
export function createConverter<T>(): FirestoreDataConverter<T> {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toFirestore(modelObject: any): DocumentData {
      // Exclude 'id' as it is the document key, not a field
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...data } = modelObject as Record<string, unknown>;
      return convertDateToTimestamp(data);
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): T {
      const data = snapshot.data(options);
      return {
        id: snapshot.id,
        ...convertTimestampToDate(data),
      } as unknown as T;
    },
  };
}
