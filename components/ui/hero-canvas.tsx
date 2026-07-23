"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

// Интерактивная пиксельная сетка на фоне hero.
// Приём вдохновлён «pixel ripple» hero-референсами, но выдержан в нашей
// тёмной палитре: точки едва тлеют, оживают у курсора лаймовым свечением.
// Учитывает prefers-reduced-motion, devicePixelRatio и ресайз.
export function HeroCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;

    const GAP = 30; // шаг сетки в CSS-пикселях
    const DOT = 1.4; // базовый радиус точки
    const RADIUS = 150; // радиус влияния курсора
    const LIME = { r: 181, g: 224, b: 36 };

    let width = 0;
    let height = 0;
    // Курсор храним за пределами экрана, чтобы на старте сетка была спокойной.
    const pointer = { x: -9999, y: -9999 };
    let raf = 0;
    let start = performance.now();

    function resize() {
      const parent = el!.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      el!.width = Math.floor(width * dpr);
      el!.height = Math.floor(height * dpr);
      el!.style.width = `${width}px`;
      el!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(now: number) {
      ctx!.clearRect(0, 0, width, height);
      const t = (now - start) / 1000;

      for (let x = GAP / 2; x < width; x += GAP) {
        for (let y = GAP / 2; y < height; y += GAP) {
          // Тихое «дыхание» сетки, чтобы фон жил и без курсора.
          const idle = 0.06 + 0.04 * Math.sin(t * 0.9 + x * 0.02 + y * 0.02);

          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = dist < RADIUS ? 1 - dist / RADIUS : 0;
          const eased = influence * influence;

          const alpha = Math.min(1, idle + eased * 0.9);
          const size = DOT + eased * 2.1;

          if (eased > 0.01) {
            // У курсора точки уходят в лайм.
            ctx!.fillStyle = `rgba(${LIME.r}, ${LIME.g}, ${LIME.b}, ${alpha})`;
          } else {
            ctx!.fillStyle = `rgba(150, 160, 150, ${alpha})`;
          }

          ctx!.beginPath();
          ctx!.arc(x, y, size, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    }

    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    }

    function onLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
    }

    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      // Без анимации — один статичный кадр приглушённой сетки.
      ctx.clearRect(0, 0, width, height);
      for (let x = GAP / 2; x < width; x += GAP) {
        for (let y = GAP / 2; y < height; y += GAP) {
          ctx.fillStyle = "rgba(150, 160, 150, 0.08)";
          ctx.beginPath();
          ctx.arc(x, y, DOT, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      return () => window.removeEventListener("resize", resize);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    start = performance.now();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
