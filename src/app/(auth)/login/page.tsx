import type { Metadata } from "next";
import { APP_NAME } from "@/constants";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: `Sign In | ${APP_NAME}`,
  description: "Sign in to Stadium AI Copilot",
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
