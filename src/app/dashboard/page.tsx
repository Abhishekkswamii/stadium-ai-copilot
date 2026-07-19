import type { Metadata } from "next";
import { APP_NAME } from "@/constants";
import { DashboardView } from "@/features/dashboard/components/dashboard-view";

export const metadata: Metadata = {
  title: `Dashboard | ${APP_NAME}`,
  description: "Real-time stadium operations overview",
};

// In production, the stadium ID would come from user context or URL params.
// We default to the mock stadium ID for the demonstration.
const DEFAULT_STADIUM_ID = "stadium-wembley-01";

export default function DashboardPage() {
  return <DashboardView stadiumId={DEFAULT_STADIUM_ID} />;
}
