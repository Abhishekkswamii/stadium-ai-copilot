"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, AlertTriangle, Zap, FileText } from "lucide-react";

const previews = [
  {
    title: "Dashboard",
    description: "Live operations overview",
    icon: LayoutDashboard,
    color: "text-blue-500",
  },
  {
    title: "Incident Analysis",
    description: "AI-powered risk assessment",
    icon: AlertTriangle,
    color: "text-red-500",
  },
  {
    title: "Scenario Simulator",
    description: "Predict event impacts",
    icon: Zap,
    color: "text-green-500",
  },
  {
    title: "Operations Briefing",
    description: "Executive summary",
    icon: FileText,
    color: "text-amber-500",
  },
];

export function PreviewSection() {
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
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Application Preview</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Purpose-built interface for stadium operations.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2">
          {previews.map((preview, index) => (
            <motion.div
              key={preview.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="group overflow-hidden border-border/50 transition-all hover:border-border hover:shadow-lg">
                <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 p-8">
                  <div className="flex h-full flex-col items-center justify-center gap-4 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm">
                    <div
                      className={`rounded-lg bg-background p-4 ${preview.color} transition-transform group-hover:scale-110`}
                    >
                      <preview.icon className="h-8 w-8" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold">{preview.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{preview.description}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Interactive
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 text-center text-sm text-muted-foreground"
        >
          <p>
            Launch the dashboard to see the full application in action →{" "}
            <a
              href="/dashboard"
              className="font-semibold text-foreground underline-offset-4 hover:underline"
            >
              Try it now
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
