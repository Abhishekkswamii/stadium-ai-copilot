import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface PageShellProps {
  children: ReactNode;
  className?: string;
}

/**
 * Page shell — consistent padding and max-width for dashboard pages.
 */
export function PageShell({ children, className }: PageShellProps) {
  return (
    <main role="main" className={cn("container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8", className)}>
      {children}
    </main>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  /** Slot for action buttons or status badges rendered to the right of the title */
  actions?: ReactNode;
  /** Alternative to actions — accepts children directly */
  children?: ReactNode;
}

/**
 * Page header — title, optional description, and optional right-side content.
 * Accepts either `actions` prop or `children` (children takes precedence).
 */
export function PageHeader({ title, description, actions, children }: PageHeaderProps) {
  const right = children ?? actions;
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {right && <div className="flex items-center gap-2">{right}</div>}
    </div>
  );
}
