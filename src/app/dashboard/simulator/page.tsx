import type { Metadata } from "next";
import { APP_NAME } from "@/constants";
import { SimulatorView } from "@/features/simulator/components/simulator-view";

export const metadata: Metadata = {
  title: `Simulator | ${APP_NAME}`,
  description: "AI-powered scenario simulator for stadium operations",
};

const DEFAULT_STADIUM_ID = "stadium-wembley-01";

export default function SimulatorPage() {
  return <SimulatorView stadiumId={DEFAULT_STADIUM_ID} />;
}
