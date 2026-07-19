"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Zap,
  Sparkles,
  TrendingUp,
  Shield,
  Scaling,
  Smartphone,
  Eye,
} from "lucide-react";

const highlights = [
  {
    icon: Zap,
    title: "Realtime",
    description: "Live data synchronization across all clients",
  },
  {
    icon: Sparkles,
    title: "AI-Powered",
    description: "Context-aware intelligence using Gemini 2.5",
  },
  {
    icon: TrendingUp,
    title: "Decision Support",
    description: "Structured insights for faster decisions",
  },
  {
    icon: Shield,
    title: "Secure",
    description: "Firebase Auth with session cookies",
  },
  {
    icon: Scaling,
    title: "Scalable",
    description: "Serverless infrastructure handles spikes",
  },
  {
    icon: Smartphone,
    title: "Responsive",
    description: "Mobile-first design for field operators",
  },
  {
    icon: Eye,
    title: "Accessible",
    description: "WCAG AA compliant for all users",
  },
];

export function WhySection() {
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
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why This Project Stands Out
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Built with modern best practices and production-ready architecture.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
            >
              <Card className="group h-full border-border/50 text-center transition-all hover:border-border hover:shadow-md">
                <CardHeader>
                  <div className="mx-auto mb-2 inline-flex rounded-lg bg-primary/10 p-3 text-primary transition-transform group-hover:scale-110">
                    <highlight.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{highlight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{highlight.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
