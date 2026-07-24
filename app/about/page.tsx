import type { Metadata } from "next";
import { Factory, ShieldCheck, Users, MapPin, Clock, Building2, Globe, BadgeCheck } from "lucide-react";
import { Counter } from "@/components/ui/counter";
import { Button } from "@/components/ui/button";
import { SectionKicker } from "@/components/ui/section-kicker";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { SideRays } from "@/components/ui/side-rays";
import { siteConfig } from "@/lib/site-config";
import "@/components/ui/glare-hover.css";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "Street Gym Factory — производитель и интегратор уличных спортивных площадок полного цикла: проектирование, производство, монтаж и гарантийное обслуживание.",
};

const stats = [
  { icon: Clock, value: siteConfig.stats.yearsOnMarket, suffix: "", label: "лет на рынке" },
  { icon: Building2, value: siteConfig.stats.objectsBuilt, suffix: "+", label: "построенных объектов" },
  { icon: Globe, value: siteConfig.stats.regions, suffix: "", label: "регионов России" },
  { icon: BadgeCheck, value: siteConfig.stats.warrantyYears, suffix: " лет", label: "гарантии" },
];

const principles = [
  {
    icon: Factory,
    title: "Полный цикл",
    description: "Проектируем, производим и монтируем сами — без посредников на ключевых этапах.",
  },
  {
    icon: ShieldCheck,
    title: "Прозрачность",
    description: "Фиксированная смета, договор и сертификаты — важно для тендеров и бюджетных заказчиков.",
  },
  {
    icon: Users,
    title: "Работа с B2B и госсектором",
    description: "Опыт работы с УК, застройщиками, школами и муниципалитетами по всей России.",
  },
  {
    icon: MapPin,
    title: "География",
    description: `Монтажные бригады выезжают в ${siteConfig.stats.regions} регионов — от Калининграда до Дальнего Востока.`,
  },
];

const glareStyle = {
  "--gh-angle": "-45deg",
  "--gh-rgba": "rgba(181, 224, 36, 0.28)",
  "--gh-size": "220%",
  "--gh-duration": "800ms",
} as React.CSSProperties;

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-container px-5 py-section-mobile md:px-8 lg:px-10 lg:py-section-inner">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -inset-x-10 -top-20 h-[480px]">
          <SideRays
            origin="top-right"
            rayColor1="#b5e024"
            rayColor2="#f4f5f5"
            intensity={0.55}
            opacity={0.3}
            blend={0.22}
            speed={1.4}
          />
        </div>
        <div className="relative flex flex-col gap-4">
          <SectionKicker>О компании</SectionKicker>
          <h1 className="max-w-prose text-h1 font-heading text-text-primary">
            Производитель и интегратор уличных спортивных площадок
          </h1>
          <p className="max-w-prose text-body-lg text-text-secondary">
            {siteConfig.name} проектирует, производит на собственном заводе и монтирует уличное
            спортивное оборудование под ключ — для застройщиков, управляющих компаний,
            муниципалитетов и школ.
          </p>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="glare-hover group flex flex-col gap-4 rounded-card border border-stroke-subtle bg-bg-card p-6 transition-colors duration-500 ease-smooth hover:border-accent-lime/30"
            style={glareStyle}
          >
            <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-control border border-accent-lime/20 bg-accent-lime/10 transition-colors duration-500 ease-smooth group-hover:border-accent-lime/40 group-hover:bg-accent-lime/15">
              <stat.icon size={20} className="text-accent-lime" strokeWidth={1.75} />
            </div>
            <div className="relative z-10 flex flex-col gap-1">
              <span className="text-h2 font-heading tabular-nums text-text-primary">
                <Counter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-caption uppercase tracking-wide text-text-tertiary">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-section-mobile lg:mt-section-inner">
        <h2 className="text-h2 font-heading text-text-primary">Принципы работы</h2>
        <CursorGlow className="mt-10 w-full">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((item) => (
              <div
                key={item.title}
                className="group relative flex flex-col gap-4 overflow-hidden rounded-card border border-stroke-subtle bg-bg-card p-6 transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-accent-lime/40 hover:shadow-[0_0_50px_-16px_rgba(181,224,36,0.3)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-control border border-accent-lime/20 bg-accent-lime/10 transition-colors duration-500 ease-smooth group-hover:border-accent-lime/40 group-hover:bg-accent-lime/15">
                  <item.icon size={20} className="text-accent-lime" strokeWidth={1.75} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-h3 font-heading text-text-primary">{item.title}</h3>
                  <p className="text-sm text-text-secondary">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CursorGlow>
      </div>

      <div className="mt-section-mobile flex flex-wrap gap-4 lg:mt-section-inner">
        <Button href="/production" variant="secondary">
          Как устроено производство
        </Button>
        <Button href="/contacts#form" variant="primary">
          Получить расчёт проекта
        </Button>
      </div>
    </div>
  );
}
