"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

// Плывущие линии — фоновая текстура для тёмных секций взамен стоковых фото.
// Форма — чистая математика (веер кривых Безье), цвет — фирменный лайм на грани видимости.
function generatePaths(position: number, count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
    opacity: 0.03 + i * 0.012,
    duration: 24 + (i % 6) * 3,
  }));
}

function PathLayer({ position, count }: { position: number; count: number }) {
  const reduced = usePrefersReducedMotion();
  const paths = generatePaths(position, count);

  return (
    <div className="absolute inset-0">
      <svg className="h-full w-full" viewBox="0 0 696 316" fill="none" preserveAspectRatio="none">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="rgb(var(--accent-lime))"
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            initial={{ pathLength: 0.3, opacity: 0.5 }}
            animate={
              reduced
                ? undefined
                : { pathLength: 1, opacity: [0.2, 0.5, 0.2], pathOffset: [0, 1, 0] }
            }
            transition={{ duration: path.duration, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>
    </div>
  );
}

export function FloatingPathsBackground({ pathCount = 24 }: { pathCount?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <PathLayer position={1} count={pathCount} />
      <PathLayer position={-1} count={pathCount} />
    </div>
  );
}
