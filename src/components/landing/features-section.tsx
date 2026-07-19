"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LayoutDashboard,
  AlertTriangle,
  Sparkles,
  FileText,
  Zap,
  RefreshCw,
} from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Live Operations Dashboard",
    description: "Unified real-time view of crowd density, gates, incidents, alerts, and weather.",
    color: "text-blue-500",
  },
  {
    icon: AlertTriangle,
    title: "Incident Operations Center",
    description: "Create, assign, track, and resolve incidents with searchable history.",
    color: "text-red-500",
  },
  {
    icon: Sparkles,
    title: "AI Incident Intelligence",
    description: "Context-aware AI analysis providing risk assessment and recommended actions.",
    color: "text-purple-500",
  },
  {
    icon: FileText,
    title: "Operations Briefing",
    description: "Executive-level AI summary of operational status and top risks.",
    color: "text-amber-500",
  },
  {
    icon: Zap,
    title: "Scenario Simulator",
    description: "Predict operational impacts of hypothetical events using AI.",
    color: "text-green-500",
  },
  {
    icon: RefreshCw,
    title: "Realtime Firestore Updates",
    description: "Instant data synchronization across all connected clients.",
    color: "text-cyan-500",
  },
];

export function FeaturesSection() {
  return (
    <section className="border-b py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Core Features</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Purpose-built tools for stadium operations teams.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full border-border/50 transition-all hover:border-border hover:shadow-lg">
                <CardHeader>
                  <div
                    className={`mb-3 inline-flex rounded-lg bg-background p-3 ${feature.color} transition-transform group-hover:scale-110`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
