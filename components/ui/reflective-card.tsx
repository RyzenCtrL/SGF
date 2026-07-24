"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Activity, BadgeCheck } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { SpecularRim } from "@/components/ui/specular-rim";
import "./reflective-card.css";

interface ReflectiveCardProps {
  name: string;
  role: string;
  initials: string;
  badge?: string;
  metalness?: number;
  roughness?: number;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  className?: string;
}

const tiltSpring = { damping: 24, stiffness: 220, mass: 1.1 };

// Адаптация двух компонентов reactbits.dev под нашу карточку команды:
//
// ReflectiveCard: в оригинале "отражение" — это живое видео с вебкамеры
// посетителя, пропущенное через SVG-фильтр. Запрашивать доступ к камере ради
// декоративной карточки на публичном сайте — плохая идея, поэтому здесь тот же
// металлический блеск/зерно/стеклянная кромка держатся на статичном градиенте
// без камеры и без агрессивного specular-фильтра (он забивал текст).
//
// TiltedCard: 3D-наклон карточки за курсором мыши (framer-motion — тот же
// пакет, что "motion/react" в исходнике, только под старым именем, уже стоит
// в проекте).
export function ReflectiveCard({
  name,
  role,
  initials,
  badge = "КОМАНДА",
  metalness = 0.55,
  roughness = 0.18,
  rotateAmplitude = 10,
  scaleOnHover = 1.03,
  className = "",
}: ReflectiveCardProps) {
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(useMotionValue(0), tiltSpring);
  const rotateY = useSpring(useMotionValue(0), tiltSpring);
  const scale = useSpring(1, tiltSpring);
  const [isHovering, setIsHovering] = useState(false);

  const cssVariables = {
    "--metalness": metalness,
    "--roughness": roughness,
  } as React.CSSProperties;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (glowRef.current) {
      glowRef.current.style.setProperty("--cx", `${x}px`);
      glowRef.current.style.setProperty("--cy", `${y}px`);
      glowRef.current.style.opacity = "1";
    }

    if (!reduced) {
      const offsetX = x - rect.width / 2;
      const offsetY = y - rect.height / 2;
      rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
      rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);
    }
  }

  function handleMouseEnter() {
    if (!reduced) scale.set(scaleOnHover);
    setIsHovering(true);
  }

  function handleMouseLeave() {
    if (glowRef.current) glowRef.current.style.opacity = "0";
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    setIsHovering(false);
  }

  return (
    <div className="h-full w-full" style={{ perspective: 900 }}>
      <motion.div
        ref={containerRef}
        className={`reflective-card-container ${isHovering ? "is-hovering" : ""} ${className}`}
        style={{ ...cssVariables, rotateX, rotateY, scale }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="reflective-surface" />
        <div className="reflective-noise" />
        <div className="reflective-sheen" />
        <div ref={glowRef} className="reflective-cursor-glow" aria-hidden />
        <div className="reflective-border" />
        <SpecularRim hostRef={containerRef} radius={16} />

        <div className="reflective-content">
          <div className="rc-header">
            <span className="rc-badge">
              <span className="rc-dot" />
              {badge}
            </span>
            <Activity size={16} className="rc-status-icon" strokeWidth={1.75} />
          </div>

          <div className="rc-body">
            <span className="rc-monogram">{initials}</span>
          </div>

          <div className="rc-footer">
            <div className="rc-id-section">
              <span className="rc-label">Сотрудник</span>
              <span className="rc-value">{name}</span>
              <span className="rc-role">{role}</span>
            </div>
            <BadgeCheck size={22} className="rc-verified-icon" strokeWidth={1.75} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
