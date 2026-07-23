"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { GrainOverlay } from "@/components/ui/grain-overlay";
import { HeroCanvas } from "@/components/ui/hero-canvas";
import { siteConfig } from "@/lib/site-config";
import { EASE_SMOOTH } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const stats = [
  { value: siteConfig.stats.yearsOnMarket, suffix: "", label: "лет производства", accent: false },
  { value: siteConfig.stats.objectsBuilt, suffix: "+", label: "построенных объектов", accent: true },
  { value: siteConfig.stats.regions, suffix: "", label: "регионов России", accent: false },
  { value: siteConfig.stats.warrantyYears, suffix: " лет", label: "гарантии", accent: false },
];

// Осмысленный, уверенный вход блоков сверху вниз при загрузке.
const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
};

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const motionProps = reduced
    ? {}
    : { variants: container, initial: "hidden" as const, animate: "show" as const };
  const childProps = reduced ? {} : { variants: item };

  return (
    <section className="relative flex min-h-[calc(100svh-5rem)] w-full items-center overflow-hidden bg-bg-primary">
      {/* Фон: статичное фото объекта */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-night-gym.png"
          alt="Уличная спортивная площадка Street Gym Factory ночью"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
      </div>

      {/* Скримы: слева темнее для читаемости текста, снизу — стык со следующим блоком */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/70 to-bg-primary/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary/30" />
      {/* Мягкое лаймовое свечение в левом-нижнем углу — «фирменный» акцент */}
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-accent-lime/10 blur-[120px]" />

      {/* Интерактивная пиксельная сетка */}
      <HeroCanvas className="absolute inset-0 z-[1] opacity-60" />

      <GrainOverlay className="z-[2]" />

      <motion.div
        {...motionProps}
        className="relative z-10 mx-auto w-full max-w-container px-5 py-12 md:px-8 lg:px-10"
      >
        <div className="flex max-w-[860px] flex-col gap-5">
          <motion.span
            {...childProps}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-stroke-subtle bg-bg-card/50 px-4 py-1.5 text-caption uppercase tracking-wide text-text-secondary backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
            Производитель уличного спортивного оборудования
          </motion.span>

          <motion.h1 {...childProps} className="text-display font-heading text-text-primary">
            Уличные спортивные
            <br />
            площадки <span className="text-accent-lime">под ключ</span>
          </motion.h1>

          <motion.p
            {...childProps}
            className="max-w-prose text-body-lg text-text-secondary"
          >
            Проектируем, производим на собственном заводе и монтируем по всей России. От эскиза
            до сдачи объекта — {siteConfig.stats.installDays} дней.
          </motion.p>

          <motion.div {...childProps} className="flex flex-wrap gap-4 pt-2">
            <Button href="/contacts#form" variant="primary">
              Получить расчёт проекта
            </Button>
            <Button href="/projects" variant="secondary">
              Смотреть проекты
            </Button>
          </motion.div>

          <motion.div
            {...childProps}
            className="mt-6 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-stroke-subtle pt-6 sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span
                  className={`text-h2 font-heading tabular-nums ${
                    stat.accent ? "text-accent-lime" : "text-text-primary"
                  }`}
                >
                  <Counter value={stat.value} suffix={stat.suffix} startOnMount />
                </span>
                <span className="text-caption uppercase tracking-wide text-text-secondary">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Ненавязчивый указатель прокрутки */}
      {!reduced && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 lg:block"
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-stroke-subtle p-1.5">
            <motion.span
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1 rounded-full bg-accent-lime"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
