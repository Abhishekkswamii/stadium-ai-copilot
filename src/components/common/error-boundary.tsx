"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Class-based error boundary for catching React rendering errors.
 * The App Router's error.tsx handles route-level errors,
 * but this handles component-level errors inside Server Components renders.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("[ErrorBoundary]", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div role="alert" className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
          <p className="text-sm font-medium text-destructive">Something went wrong</p>
          {this.state.error && (
            <p className="mt-1 text-xs text-muted-foreground">{this.state.error.message}</p>
          )}
          <button
            onClick={this.handleReset}
            className="mt-3 text-xs text-primary underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
