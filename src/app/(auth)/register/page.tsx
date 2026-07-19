import type { Metadata } from "next";
import { APP_NAME } from "@/constants";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: `Create Account | ${APP_NAME}`,
  description: "Create a Stadium AI Copilot account",
};

export default function RegisterPage() {
  return <AuthForm mode="register" />;
}
