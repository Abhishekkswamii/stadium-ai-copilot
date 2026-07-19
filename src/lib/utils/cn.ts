import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS class names with proper conflict resolution.
 * Use this everywhere instead of raw string concatenation.
 *
 * @example
 * cn("px-4 py-2", condition && "bg-blue-500", "px-2") // → "py-2 bg-blue-500 px-2"
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
