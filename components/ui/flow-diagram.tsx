"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

// Узлы слева пунктиром сходятся в светящийся центральный бейдж —
// визуализация «разные этапы/материалы → единое производство».
const CENTER = { x: 88, y: 50 };
const TOP_PADDING = 0.1;
const BOTTOM_PADDING = 0.1;

export function FlowDiagram({
  nodes,
  centerIcon: CenterIcon,
}: {
  nodes: LucideIcon[];
  centerIcon: LucideIcon;
}) {
  const reduced = usePrefersReducedMotion();
  const span = 1 - TOP_PADDING - BOTTOM_PADDING;
  const nodeY = nodes.map((_, i) =>
    nodes.length === 1 ? 0.5 : TOP_PADDING + (i / (nodes.length - 1)) * span
  );

  return (
    <div className="relative h-48 w-full">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        {nodes.map((_, i) => {
          const y = nodeY[i] * 100;
          // плавная кривая: выходит из узла горизонтально, входит в центр горизонтально
          const d = `M 16 ${y} C 44 ${y}, ${CENTER.x - 28} ${CENTER.y}, ${CENTER.x} ${CENTER.y}`;
          return (
            <motion.path
              key={i}
              d={d}
              className="fill-none stroke-stroke-subtle"
              strokeWidth={1}
              strokeDasharray="3 3"
              vectorEffect="non-scaling-stroke"
              initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
              whileInView={reduced ? undefined : { pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
            />
          );
        })}
      </svg>

      {nodes.map((Icon, i) => (
        <div
          key={i}
          className="absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-control border border-stroke-subtle bg-bg-primary/70 backdrop-blur-sm"
          style={{ left: "16%", top: `${nodeY[i] * 100}%` }}
        >
          <Icon size={20} className="text-text-secondary" strokeWidth={1.5} />
        </div>
      ))}

      <div
        className="absolute flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent-lime/30 bg-accent-lime/10 shadow-[0_0_28px_-4px_rgba(181,224,36,0.45)]"
        style={{ left: `${CENTER.x}%`, top: `${CENTER.y}%` }}
      >
        <CenterIcon size={32} className="text-accent-lime" strokeWidth={1.5} />
      </div>
    </div>
  );
}
