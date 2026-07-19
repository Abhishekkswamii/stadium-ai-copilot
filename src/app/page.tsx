import { HeroSection } from "@/components/landing/hero-section";
import { TechStackSection } from "@/components/landing/tech-stack-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { AIWorkflowSection } from "@/components/landing/ai-workflow-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { ArchitectureSection } from "@/components/landing/architecture-section";
import { PreviewSection } from "@/components/landing/preview-section";
import { WhySection } from "@/components/landing/why-section";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stadium AI Copilot - AI-Powered Stadium Operations",
  description:
    "Monitor live operations, analyze incidents, assess risks, and support operational decisions using Gemini 2.5 Flash-Lite AI.",
  keywords: [
    "stadium operations",
    "AI copilot",
    "incident management",
    "crowd management",
    "Gemini AI",
    "Firebase",
    "Next.js",
  ],
  openGraph: {
    title: "Stadium AI Copilot",
    description: "AI-Powered Stadium Operations Platform",
    type: "website",
  },
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <TechStackSection />
      <ProblemSection />
      <AIWorkflowSection />
      <FeaturesSection />
      <ArchitectureSection />
      <PreviewSection />
      <WhySection />
      <CTASection />
      <Footer />
    </main>
  );
}
