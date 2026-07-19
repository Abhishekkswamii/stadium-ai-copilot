"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  AlertCircle,
  Database,
  Sparkles,
  FileText,
  UserCheck,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: AlertCircle,
    title: "Incident",
    description: "Operator reports event",
  },
  {
    icon: Database,
    title: "Live Context",
    description: "Firestore telemetry",
  },
  {
    icon: Sparkles,
    title: "Gemini 2.5 Flash-Lite",
    description: "AI analysis",
  },
  {
    icon: FileText,
    title: "Structured Response",
    description: "Risk assessment",
  },
  {
    icon: UserCheck,
    title: "Operator Decision",
    description: "Informed action",
  },
];

export function AIWorkflowSection() {
  return (
    <section className="border-b bg-muted/30 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How AI Assists</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Instead of replacing operators, the system assists them with context-aware AI analysis.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start lg:justify-between">
            {steps.map((step, index) => (
              <div key={step.title} className="flex flex-col items-center gap-4 lg:flex-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="flex h-40 w-40 flex-col items-center justify-center border-border/50 bg-background p-6 shadow-sm transition-all hover:shadow-lg">
                    <div className="mb-3 rounded-lg bg-primary/10 p-3 text-primary">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-center text-sm font-semibold">{step.title}</h3>
                    <p className="mt-1 text-center text-xs text-muted-foreground">
                      {step.description}
                    </p>
                  </Card>
                </motion.div>

                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                    className="hidden text-muted-foreground lg:mt-16 lg:block"
                  >
                    <ArrowRight className="h-6 w-6" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground">
              AI provides <span className="font-semibold text-foreground">structured insights</span>{" "}
              that empower operators to make{" "}
              <span className="font-semibold text-foreground">faster, better decisions</span> under
              pressure.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
