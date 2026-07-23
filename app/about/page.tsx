import type { Metadata } from "next";
import { Factory, ShieldCheck, Users, MapPin } from "lucide-react";
import { Counter } from "@/components/ui/counter";
import { Button } from "@/components/ui/button";
import { SectionKicker } from "@/components/ui/section-kicker";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "Street Gym Factory — производитель и интегратор уличных спортивных площадок полного цикла: проектирование, производство, монтаж и гарантийное обслуживание.",
};

const stats = [
  { value: siteConfig.stats.yearsOnMarket, suffix: "", label: "лет на рынке" },
  { value: siteConfig.stats.objectsBuilt, suffix: "+", label: "построенных объектов" },
  { value: siteConfig.stats.regions, suffix: "", label: "регионов России" },
  { value: siteConfig.stats.warrantyYears, suffix: " лет", label: "гарантии" },
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

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-container px-5 py-section-mobile md:px-8 lg:px-10 lg:py-section-inner">
      <div className="flex flex-col gap-4">
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

      <div className="mt-16 grid grid-cols-2 gap-8 border-y border-stroke-subtle py-10 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <span className="text-h2 font-heading tabular-nums text-text-primary">
              <Counter value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="text-caption uppercase tracking-wide text-text-tertiary">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-section-mobile lg:mt-section-inner">
        <h2 className="text-h2 font-heading text-text-primary">Принципы работы</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((item) => (
            <div key={item.title} className="flex flex-col gap-3">
              <item.icon size={24} className="text-text-secondary" strokeWidth={1.5} />
              <h3 className="text-h3 font-heading text-text-primary">{item.title}</h3>
              <p className="text-sm text-text-secondary">{item.description}</p>
            </div>
          ))}
        </div>
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
