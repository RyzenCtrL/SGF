"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

// Концентрические кольца с медленно вращающимися точками —
// мотив «защита/сертификация», иконка неподвижна в центре.
const RINGS = [24, 36, 48];
const DOTS = [
  { angle: -90, radius: 48 },
  { angle: 55, radius: 36 },
  { angle: 165, radius: 48 },
  { angle: 210, radius: 24 },
];

export function RadarRings({ icon: Icon }: { icon: LucideIcon }) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="relative mx-auto h-28 w-28">
      <svg viewBox="0 0 120 120" className="h-full w-full">
        {RINGS.map((r) => (
          <circle
            key={r}
            cx={60}
            cy={60}
            r={r}
            className="fill-none stroke-stroke-subtle"
            strokeWidth={1}
          />
        ))}
      </svg>

      <motion.svg
        viewBox="0 0 120 120"
        className="absolute inset-0 h-full w-full"
        style={{ transformOrigin: "50% 50%" }}
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
      >
        {DOTS.map((dot, i) => {
          const rad = (dot.angle * Math.PI) / 180;
          const cx = 60 + dot.radius * Math.cos(rad);
          const cy = 60 + dot.radius * Math.sin(rad);
          return <circle key={i} cx={cx} cy={cy} r={2.5} className="fill-accent-lime" />;
        })}
      </motion.svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent-lime/30 bg-accent-lime/10 shadow-[0_0_24px_-4px_rgba(181,224,36,0.45)]">
          <Icon size={20} className="text-accent-lime" strokeWidth={1.75} />
        </div>
      </div>
    </div>
  );
}
