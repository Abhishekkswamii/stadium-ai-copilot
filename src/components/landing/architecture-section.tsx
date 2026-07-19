"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowDown } from "lucide-react";

const architectureFlow = [
  { label: "Live Stadium Data", description: "Real-time telemetry" },
  { label: "Firestore", description: "Cloud database" },
  { label: "Next.js API Route", description: "Server-side handler" },
  { label: "Gemini 2.5 Flash-Lite", description: "AI processing" },
  { label: "Structured JSON Response", description: "Validated output" },
  { label: "Dashboard", description: "Live UI update" },
];

export function ArchitectureSection() {
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
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">AI Architecture</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Structured AI responses improve operational decision-making.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 max-w-2xl">
          <div className="flex flex-col items-center gap-6">
            {architectureFlow.map((step, index) => (
              <div key={step.label} className="w-full">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="border-border/50 bg-background p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{step.label}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-primary/10 p-2 text-primary">
                        <span className="text-sm font-bold">{index + 1}</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {index < architectureFlow.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                    className="my-4 flex justify-center"
                  >
                    <ArrowDown className="h-6 w-6 text-muted-foreground" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-12 rounded-lg border border-border/50 bg-card p-6"
          >
            <h3 className="mb-3 font-semibold">Why Structured AI Responses?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Predictable, parseable output that integrates cleanly with the UI</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Validated schemas prevent hallucination from breaking the application</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Operators receive consistent, actionable insights under pressure</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
