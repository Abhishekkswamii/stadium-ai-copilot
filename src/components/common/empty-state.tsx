import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

/**
 * Empty state component — shown when a list or data set has no items.
 * Accepts an optional action (e.g., a button to create the first item).
 */
export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div
      role="status"
      aria-label={title}
      className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border bg-muted/30 p-10 text-center"
    >
      {Icon && (
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full bg-muted"
          aria-hidden="true"
        >
          <Icon className="h-6 w-6 text-muted-foreground" />
        </div>
      )}

      <div className="space-y-1">
        <p className="text-sm font-medium">{title}</p>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>

      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
