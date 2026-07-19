/**
 * Application error classes.
 * Use typed errors instead of throwing raw strings — enables proper catch handling.
 */

export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;

  constructor(message: string, code: string, statusCode = 500) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;
    // Maintains proper stack trace in V8
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}

export class AuthError extends AppError {
  constructor(message: string, code = "AUTH_ERROR") {
    super(message, code, 401);
    this.name = "AuthError";
  }
}

export class PermissionError extends AppError {
  constructor(message = "You do not have permission to perform this action.") {
    super(message, "PERMISSION_DENIED", 403);
    this.name = "PermissionError";
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found.`, "NOT_FOUND", 404);
    this.name = "NotFoundError";
  }
}

export class ValidationError extends AppError {
  public readonly fields: Record<string, string>;

  constructor(message: string, fields: Record<string, string> = {}) {
    super(message, "VALIDATION_ERROR", 422);
    this.name = "ValidationError";
    this.fields = fields;
  }
}

export class AIError extends AppError {
  constructor(message: string, code = "AI_ERROR") {
    super(message, code, 502);
    this.name = "AIError";
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns true if the value is an instance of AppError. */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/** Converts unknown thrown values into a consistent { message } shape. */
export function toErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "An unexpected error occurred.";
}

/** Extracts a typed AppError or wraps unknown errors. */
export function normalizeError(error: unknown): AppError {
  if (error instanceof AppError) return error;
  return new AppError(toErrorMessage(error), "UNKNOWN_ERROR");
}
