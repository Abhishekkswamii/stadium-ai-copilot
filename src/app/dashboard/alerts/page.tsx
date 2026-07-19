import type { Metadata } from "next";
import { APP_NAME } from "@/constants";
import { AlertsView } from "./alerts-view";

export const metadata: Metadata = {
  title: `Alerts | ${APP_NAME}`,
  description: "Real-time stadium alerts",
};

export default function AlertsPage() {
  return (
    <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Alerts</h1>
        <p className="text-sm text-muted-foreground">Real-time operational alerts</p>
      </div>
      <AlertsView />
    </div>
  );
}
