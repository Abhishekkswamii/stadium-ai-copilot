import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";

/**
 * Formats a Date as a human-readable relative string.
 * @example "2 hours ago", "Yesterday", "Jan 15, 2025"
 */
export function formatRelativeDate(date: Date): string {
  if (isToday(date)) {
    return formatDistanceToNow(date, { addSuffix: true });
  }
  if (isYesterday(date)) {
    return `Yesterday at ${format(date, "h:mm a")}`;
  }
  return format(date, "MMM d, yyyy");
}

/**
 * Formats a Date for display in the incident log.
 * @example "Jan 15, 2025 at 3:45 PM"
 */
export function formatEventDateTime(date: Date): string {
  return format(date, "MMM d, yyyy 'at' h:mm a");
}

/**
 * Formats a Date as a compact time string.
 * @example "3:45 PM"
 */
export function formatTime(date: Date): string {
  return format(date, "h:mm a");
}

/**
 * Converts a Firestore Timestamp-like object (with seconds/nanoseconds) to a Date.
 * Safe to use when deserializing Firestore documents.
 */
export function firestoreTimestampToDate(timestamp: {
  seconds: number;
  nanoseconds: number;
}): Date {
  return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1_000_000);
}
