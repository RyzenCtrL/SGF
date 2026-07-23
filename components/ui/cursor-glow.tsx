"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

export function CursorGlow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !glowRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    glowRef.current.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
    glowRef.current.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
    glowRef.current.style.opacity = "1";
  }

  function handleMouseLeave() {
    if (glowRef.current) glowRef.current.style.opacity = "0";
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {!reduced && (
        <div
          ref={glowRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(600px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(181,224,36,0.07), transparent 70%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        />
      )}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
