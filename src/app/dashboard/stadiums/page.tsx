import type { Metadata } from "next";
import { APP_NAME } from "@/constants";
import { StadiumsView } from "./stadiums-view";

export const metadata: Metadata = {
  title: `Stadiums | ${APP_NAME}`,
  description: "Stadium information and management",
};

export default function StadiumsPage() {
  return (
    <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Stadiums</h1>
        <p className="text-sm text-muted-foreground">
          Stadium information and real-time status
        </p>
      </div>
      <StadiumsView />
    </div>
  );
}
