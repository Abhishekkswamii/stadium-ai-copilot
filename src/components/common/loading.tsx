import type { ReactNode } from "react";

interface LoadingSpinnerProps {
  /** Accessible label for screen readers */
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-10 w-10",
} as const;

/**
 * Accessible loading spinner.
 * Uses role="status" and aria-label for screen reader announcement.
 */
export function LoadingSpinner({
  label = "Loading...",
  size = "md",
  className,
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={`inline-flex items-center justify-center ${className ?? ""}`}
    >
      <svg
        className={`animate-spin text-muted-foreground ${sizeClasses[size]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
}

interface PageLoadingProps {
  message?: string;
}

/** Full-page loading state */
export function PageLoading({ message = "Loading..." }: PageLoadingProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[400px] flex-col items-center justify-center gap-3"
    >
      <LoadingSpinner size="lg" label={message} />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

interface InlineLoadingProps {
  children?: ReactNode;
}

/** Inline skeleton loading replacement */
export function InlineLoading({ children }: InlineLoadingProps) {
  return (
    <div className="flex items-center gap-2" aria-busy="true">
      <LoadingSpinner size="sm" />
      {children && <span className="text-sm text-muted-foreground">{children}</span>}
    </div>
  );
}
