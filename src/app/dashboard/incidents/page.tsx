import type { Metadata } from "next";
import { APP_NAME } from "@/constants";
import { PageShell } from "@/components/layout/page-shell";
import { IncidentsView } from "@/features/incidents/components/incidents-view";

export const metadata: Metadata = {
  title: `Incidents | ${APP_NAME}`,
  description: "Incident Operations Center",
};

// Default stadium ID for demonstration
const DEFAULT_STADIUM_ID = "stadium-wembley-01";

export default function IncidentsPage() {
  return (
    <PageShell className="h-full flex flex-col">
      <IncidentsView stadiumId={DEFAULT_STADIUM_ID} />
    </PageShell>
  );
}
