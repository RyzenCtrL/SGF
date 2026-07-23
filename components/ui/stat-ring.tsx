"use client";

import { motion } from "framer-motion";
import { Counter } from "@/components/ui/counter";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const SIZE = 96;
const STROKE = 6;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function StatRing({ value, label }: { value: number; label: string }) {
  const reduced = usePrefersReducedMotion();
  const offset = CIRCUMFERENCE - (value / 100) * CIRCUMFERENCE;

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} className="-rotate-90">
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            strokeWidth={STROKE}
            className="fill-none stroke-stroke-subtle"
          />
          <motion.circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            className="fill-none stroke-accent-lime"
            initial={reduced ? undefined : { strokeDashoffset: CIRCUMFERENCE }}
            whileInView={reduced ? undefined : { strokeDashoffset: offset }}
            style={reduced ? { strokeDashoffset: offset } : undefined}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-heading text-lg text-text-primary">
          <Counter value={value} suffix="%" />
        </div>
      </div>
      <span className="max-w-[130px] text-sm text-text-secondary">{label}</span>
    </div>
  );
}
