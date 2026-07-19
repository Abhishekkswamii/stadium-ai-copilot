"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const technologies = [
  { name: "Next.js", color: "bg-black dark:bg-white text-white dark:text-black" },
  { name: "TypeScript", color: "bg-blue-600 text-white" },
  { name: "Firebase", color: "bg-amber-500 text-white" },
  { name: "Firestore", color: "bg-amber-600 text-white" },
  { name: "Gemini 2.5 Flash-Lite", color: "bg-blue-500 text-white" },
  { name: "Google AI Studio", color: "bg-blue-600 text-white" },
  { name: "TailwindCSS", color: "bg-cyan-500 text-white" },
  { name: "shadcn/ui", color: "bg-slate-900 text-white" },
];

export function TechStackSection() {
  return (
    <section className="border-b py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Built with modern technology
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Badge className={`${tech.color} px-4 py-2 text-sm font-medium shadow-sm`}>
                  {tech.name}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
