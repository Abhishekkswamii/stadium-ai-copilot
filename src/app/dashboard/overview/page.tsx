import { redirect } from "next/navigation";
import { ROUTES } from "@/constants";

export default function OverviewPage() {
  redirect(ROUTES.DASHBOARD);
}
