"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Ambulance,
  MessageSquareWarning,
  FolderOpen,
  Brain,
} from "lucide-react";

const problems = [
  {
    icon: Users,
    title: "Crowd Congestion",
    description: "Unmanaged crowd flow creates safety risks and degrades fan experience.",
    color: "text-purple-500",
  },
  {
    icon: Ambulance,
    title: "Medical Emergencies",
    description: "Delayed response times due to poor incident visibility and coordination.",
    color: "text-red-500",
  },
  {
    icon: MessageSquareWarning,
    title: "Delayed Communication",
    description: "Critical alerts lost in fragmented communication channels.",
    color: "text-amber-500",
  },
  {
    icon: FolderOpen,
    title: "Fragmented Data",
    description: "Operations teams lack unified visibility across systems.",
    color: "text-blue-500",
  },
  {
    icon: Brain,
    title: "Manual Decision Making",
    description: "Operators overwhelmed with data, struggling to prioritize actions.",
    color: "text-green-500",
  },
];

export function ProblemSection() {
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
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The Problem</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Stadium operations teams face unprecedented complexity managing tens of thousands of
            attendees in real-time.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="group h-full border-border/50 transition-all hover:border-border hover:shadow-lg">
                <CardHeader>
                  <div className={`mb-2 inline-flex rounded-lg bg-background p-3 ${problem.color}`}>
                    <problem.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{problem.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{problem.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
