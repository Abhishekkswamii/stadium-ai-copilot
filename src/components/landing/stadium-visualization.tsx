"use client";

import { motion } from "framer-motion";
import {
  Ambulance,
  ShieldAlert,
  CloudRain,
  DoorOpen,
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const floatingCards = [
  {
    icon: Ambulance,
    title: "Medical Incident",
    subtitle: "Section A - Row 12",
    color: "text-red-500",
    position: "top-0 left-0",
    delay: 0,
  },
  {
    icon: ShieldAlert,
    title: "Security Alert",
    subtitle: "Gate 4 - High Priority",
    color: "text-amber-500",
    position: "top-0 right-0",
    delay: 0.2,
  },
  {
    icon: CloudRain,
    title: "Weather Alert",
    subtitle: "Light rain expected",
    color: "text-blue-500",
    position: "bottom-0 left-0",
    delay: 0.4,
  },
  {
    icon: DoorOpen,
    title: "Gate Status",
    subtitle: "4/6 Gates Open",
    color: "text-green-500",
    position: "bottom-0 right-0",
    delay: 0.6,
  },
  {
    icon: Users,
    title: "Crowd Density",
    subtitle: "89% Capacity",
    color: "text-purple-500",
    position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    delay: 0.8,
  },
];

export function StadiumVisualization() {
  return (
    <div className="relative min-h-[500px]">
      {/* Stadium SVG */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex items-center justify-center"
      >
        <svg
          viewBox="0 0 400 400"
          className="h-80 w-80 drop-shadow-xl sm:h-96 sm:w-96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stadium Outer Ring */}
          <circle
            cx="200"
            cy="200"
            r="180"
            className="fill-primary/5 stroke-primary/30"
            strokeWidth="2"
          />

          {/* Stadium Sections */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, i) => (
            <motion.path
              key={i}
              d="M 200 200 L 200 20 A 180 180 0 0 1 263.64 56.36 Z"
              className="fill-primary/10 stroke-primary/40"
              strokeWidth="1"
              transform={`rotate(${rotation} 200 200)`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}

          {/* Inner Field */}
          <ellipse
            cx="200"
            cy="200"
            rx="120"
            ry="90"
            className="fill-green-500/20 stroke-green-500/40"
            strokeWidth="2"
          />

          {/* Field Lines */}
          <line
            x1="200"
            y1="110"
            x2="200"
            y2="290"
            className="stroke-green-500/30"
            strokeWidth="1"
          />
          <circle
            cx="200"
            cy="200"
            r="20"
            className="fill-none stroke-green-500/30"
            strokeWidth="1"
          />
        </svg>
      </motion.div>

      {/* Floating Cards */}
      {floatingCards.map((card, index) => (
        <motion.div
          key={index}
          className={`absolute ${card.position}`}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { delay: card.delay, duration: 0.5 },
            scale: { delay: card.delay, duration: 0.5 },
            y: {
              delay: card.delay + 0.5,
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <Card className="border-border/50 bg-card/50 p-4 shadow-lg backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className={`rounded-lg bg-background p-2 ${card.color}`}>
                <card.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-semibold">{card.title}</h4>
                <p className="text-xs text-muted-foreground">{card.subtitle}</p>
              </div>
              <Badge variant="secondary" className="text-xs">
                Live
              </Badge>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
