import type { Metadata } from "next";
import { APP_NAME } from "@/constants";
import { MatchesView } from "./matches-view";

export const metadata: Metadata = {
  title: `Matches | ${APP_NAME}`,
  description: "Live match management",
};

export default function MatchesPage() {
  return (
    <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Matches</h1>
        <p className="text-sm text-muted-foreground">Live match management</p>
      </div>
      <MatchesView />
    </div>
  );
}
