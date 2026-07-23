"use client";

import {
  Factory,
  ShieldCheck,
  Wrench,
  BadgeCheck,
  LifeBuoy,
  Ruler,
  Layers,
  Flame,
  PaintBucket,
  ClipboardCheck,
} from "lucide-react";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { GrainOverlay } from "@/components/ui/grain-overlay";
import { FlowDiagram } from "@/components/ui/flow-diagram";
import { RadarRings } from "@/components/ui/radar-rings";
import { WaveChart } from "@/components/ui/wave-chart";
import { SectionKicker } from "@/components/ui/section-kicker";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const items = [
  {
    icon: Factory,
    title: "Собственное производство",
    description: `Свой завод в России — контролируем сроки и качество на каждом этапе, от раскроя стали до порошковой окраски. ${siteConfig.stats.yearsOnMarket} лет непрерывной работы.`,
    large: true,
    visual: (
      <FlowDiagram
        nodes={[Ruler, Layers, Flame, PaintBucket, ClipboardCheck]}
        centerIcon={Factory}
      />
    ),
  },
  {
    icon: ShieldCheck,
    title: "Сертификация ГОСТ",
    description: "Всё оборудование сертифицировано и соответствует требованиям безопасности.",
    visual: <RadarRings icon={ShieldCheck} />,
  },
  {
    icon: Wrench,
    title: "Монтаж под ключ",
    description: "Собственные монтажные бригады работают по всей России, включая зимний период.",
    visual: <WaveChart variant="growth" badge="32%" />,
  },
  {
    icon: BadgeCheck,
    title: `Гарантия ${siteConfig.stats.warrantyYears} лет`,
    description: "Официальный гарантийный талон и договор на каждый объект.",
    visual: <RadarRings icon={BadgeCheck} />,
  },
  {
    icon: LifeBuoy,
    title: "Сервис после сдачи",
    description: "Обслуживаем и ремонтируем площадки после завершения гарантийного срока.",
    visual: <WaveChart variant="steady" />,
  },
];

export function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-bg-secondary py-section-mobile md:py-section-inner lg:py-section-desktop">
      {/* Плавающие градиентные пятна — медленно дрейфуют по фону */}
      <div className="pointer-events-none absolute -left-40 -top-20 h-[480px] w-[480px] rounded-full bg-accent-lime/[0.07] blur-[130px] animate-float-a" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-[420px] w-[420px] rounded-full bg-accent-lime/[0.05] blur-[120px] animate-float-b" />

      {/* Виньетка для глубины — светлее к центру, темнее к краям */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(0,0,0,0.35)_100%)]" />

      <div className="relative mx-auto max-w-container px-5 md:px-8 lg:px-10">
        <Reveal className="flex flex-col gap-4">
          <SectionKicker>Почему мы</SectionKicker>
          <h2 className="max-w-prose text-h2 font-heading text-text-primary">
            Единый подрядчик от эскиза до гарантии
          </h2>
        </Reveal>

        <Reveal
          stagger
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[1fr]"
        >
          {items.map((item) => (
            <RevealItem
              key={item.title}
              className={cn(
                "group relative flex flex-col justify-between gap-6 overflow-hidden rounded-card border border-stroke-subtle bg-bg-card/60 p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] backdrop-blur-md transition-all duration-700 ease-smooth will-change-transform hover:-translate-y-1.5 hover:border-accent-lime/40 hover:bg-bg-card-hover/70 hover:shadow-[0_0_60px_-18px_rgba(181,224,36,0.35),inset_0_1px_0_0_rgba(255,255,255,0.06)]",
                item.large && "sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:p-10"
              )}
            >
              <GrainOverlay />

              <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-control border border-accent-lime/20 bg-accent-lime/10 transition-colors duration-500 ease-smooth group-hover:border-accent-lime/40 group-hover:bg-accent-lime/15">
                <item.icon size={20} className="text-accent-lime" strokeWidth={1.75} />
              </div>

              <div className="relative z-10 flex flex-col gap-2">
                <h3
                  className={cn(
                    "font-heading leading-snug text-text-primary [hyphens:auto]",
                    item.large ? "text-h3" : "text-xl"
                  )}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">{item.description}</p>
              </div>

              <div className="relative z-10 -mx-2 hidden lg:block">{item.visual}</div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
