"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import "./pill-nav.css";

interface PillNavItem {
  href: string;
  label: string;
}

interface PillNavProps {
  items: PillNavItem[];
  ease?: string;
  className?: string;
}

// Адаптация PillNav (reactbits.dev) под наш стек и стиль: react-router-dom
// заменён на next/link, свой логотип/бургер убран (в шапке уже есть Logo и
// MobileNav), белый/чёрный дуэт заменён на нашу пару лайм/графит — круг,
// поднимающийся из-под пункта меню при наведении, лаймовый, текст поверх него
// становится тёмным (accent-on-lime), как и у остальных лаймовых элементов сайта.
export function PillNav({ items, ease = "power3.easeOut", className = "" }: PillNavProps) {
  const pathname = usePathname();
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRefs = useRef<(gsap.core.Timeline | null)[]>([]);
  const activeTweenRefs = useRef<(gsap.core.Tween | null)[]>([]);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = (w * w / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${originY}px` });

        const label = pill.querySelector<HTMLElement>(".pill-label");
        const hoverLabel = pill.querySelector<HTMLElement>(".pill-label-hover");
        if (label) gsap.set(label, { y: 0 });
        if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 });

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });
        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" }, 0);
        if (label) tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: "auto" }, 0);
        if (hoverLabel) {
          gsap.set(hoverLabel, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(hoverLabel, { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" }, 0);
        }
        tlRefs.current[index] = tl;
      });
    };

    layout();
    window.addEventListener("resize", layout);
    document.fonts?.ready?.then(layout).catch(() => {});
    return () => window.removeEventListener("resize", layout);
  }, [items, ease]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease, overwrite: "auto" });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, { duration: 0.2, ease, overwrite: "auto" });
  };

  return (
    <nav className={`pill-nav ${className}`} aria-label="Основная навигация">
      <ul className="pill-list" role="menubar">
        {items.map((item, i) => {
          const active = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
          return (
            <li key={item.href} role="none">
              <Link
                role="menuitem"
                href={item.href}
                className={`pill${active ? " is-active" : ""}`}
                onMouseEnter={() => handleEnter(i)}
                onMouseLeave={() => handleLeave(i)}
              >
                <span
                  className="hover-circle"
                  aria-hidden="true"
                  ref={(el) => {
                    circleRefs.current[i] = el;
                  }}
                />
                <span className="label-stack">
                  <span className="pill-label">{item.label}</span>
                  <span className="pill-label-hover" aria-hidden="true">
                    {item.label}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
