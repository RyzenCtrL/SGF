"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

// Area-график с градиентной заливкой — по мотивам референса.
// Абстрактная кривая роста без привязки к жёсткой статистике; значение
// в бейдже — плейсхолдер (badge-prop), заменяется реальной цифрой.
const VARIANTS = {
  growth: {
    line: "M0 96 C 30 92 46 84 64 84 C 84 84 96 66 118 66 C 138 66 150 74 168 66 C 188 57 196 34 210 34 C 230 34 250 52 272 46 C 284 43 292 47 300 45",
    peak: { x: 210, y: 34 },
  },
  steady: {
    line: "M0 72 C 40 58 70 84 110 68 C 150 54 180 80 220 66 C 255 54 280 72 300 64",
    peak: { x: 110, y: 68 },
  },
} as const;

export function WaveChart({
  variant = "growth",
  badge,
}: {
  variant?: keyof typeof VARIANTS;
  badge?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const { line, peak } = VARIANTS[variant];
  const gradId = `wave-fill-${variant}`;
  const area = `${line} L300 120 L0 120 Z`;

  return (
    <div className="relative h-24 w-full">
      <svg
        viewBox="0 0 300 120"
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(181 224 36)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="rgb(181 224 36)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* заливка под кривой */}
        <motion.path
          d={area}
          fill={`url(#${gradId})`}
          initial={reduced ? undefined : { opacity: 0 }}
          whileInView={reduced ? undefined : { opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: 0.5 }}
        />

        {/* базовая тусклая линия */}
        <path
          d={line}
          className="fill-none stroke-stroke-subtle"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />

        {/* яркая лаймовая кривая, дорисовывается при скролле */}
        <motion.path
          d={line}
          className="fill-none stroke-accent-lime"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={reduced ? undefined : { pathLength: 0 }}
          whileInView={reduced ? undefined : { pathLength: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>

      {/* точка на пике + бейдж-процент */}
      {badge && (
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-full"
          style={{ left: `${(peak.x / 300) * 100}%`, top: `${(peak.y / 120) * 100}%` }}
          initial={reduced ? undefined : { opacity: 0, y: 6 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-2 flex items-center gap-1 rounded-full border border-stroke-subtle bg-bg-primary/90 px-2.5 py-1 text-xs font-medium text-text-primary shadow-lg backdrop-blur-sm">
            <span className="text-accent-lime">↑</span>
            {badge}
          </div>
        </motion.div>
      )}

      {/* светящаяся точка на пике */}
      <div
        className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-lime shadow-[0_0_10px_2px_rgba(181,224,36,0.6)]"
        style={{ left: `${(peak.x / 300) * 100}%`, top: `${(peak.y / 120) * 100}%` }}
      />
    </div>
  );
}
