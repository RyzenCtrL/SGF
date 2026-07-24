"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

export function Counter({
  value,
  suffix = "",
  prefix = "",
  startOnMount = false,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  // Для цифр над сгибом (hero), которые могут не попасть в область видимости
  // на невысоких экранах — считаем сразу при монтировании.
  startOnMount?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    // Флаг живёт внутри одного прогона эффекта (не в ref) — так после
    // размонтирования/повторного монтирования (React Strict Mode в dev)
    // анимация корректно перезапускается, а не блокируется навсегда.
    let hasStarted = false;
    const run = () => {
      if (hasStarted) return;
      hasStarted = true;
      const duration = 1200;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setDisplay(Math.round(eased * value));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    if (startOnMount) {
      run();
      return () => cancelAnimationFrame(raf);
    }

    const el = ref.current;
    if (!el) return;

    // IntersectionObserver — основной способ запуска, но в некоторых
    // мобильных браузерах/встроенных WebView (мессенджеры, MIUI и т.п.)
    // он изредка не срабатывает вовсе, и счётчик навсегда остаётся на 0.
    // Дублируем проверку через getBoundingClientRect на scroll/resize и
    // подстраховываем таймером — так итоговое число гарантированно появится
    // при любом поведении браузера.
    const isVisible = () => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };
    const check = () => {
      if (isVisible()) run();
    };

    check();

    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) run();
    });
    io.observe(el);

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    const fallback = window.setTimeout(run, 4000);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      window.clearTimeout(fallback);
      cancelAnimationFrame(raf);
    };
  }, [value, reduced, startOnMount]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
