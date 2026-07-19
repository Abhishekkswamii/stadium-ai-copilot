"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

interface ClientDateProps {
  date: Date;
  addSuffix?: boolean;
}

/**
 * Client-only date formatter to prevent hydration errors.
 * Renders nothing on the server, then hydrates with the formatted date on the client.
 */
export function ClientDate({ date, addSuffix = true }: ClientDateProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span suppressHydrationWarning>Loading...</span>;
  }

  return <span>{formatDistanceToNow(date, { addSuffix })}</span>;
}
