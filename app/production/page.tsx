import type { Metadata } from "next";
import { timeline, productionSteps, team } from "@/lib/production-data";
import { siteConfig } from "@/lib/site-config";
import { SectionKicker } from "@/components/ui/section-kicker";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { ReflectiveCard } from "@/components/ui/reflective-card";

export const metadata: Metadata = {
  title: "Производство",
  description:
    "Собственный завод Street Gym Factory: технологический процесс изготовления уличных тренажёров и воркаут-комплексов, история компании и команда.",
};

export default function ProductionPage() {
  return (
    <div className="mx-auto max-w-container px-5 py-section-mobile md:px-8 lg:px-10 lg:py-section-inner">
      <div className="flex flex-col gap-4">
        <SectionKicker>Производство</SectionKicker>
        <h1 className="max-w-prose text-h1 font-heading text-text-primary">
          Свой завод — от чертежа до готового узла
        </h1>
        <p className="max-w-prose text-body-lg text-text-secondary">
          {siteConfig.stats.yearsOnMarket} лет собственного производства уличного спортивного
          оборудования полного цикла — без подрядчиков на ключевых этапах.
        </p>
      </div>

      <div className="mt-section-mobile lg:mt-section-inner">
        <h2 className="text-h2 font-heading text-text-primary">История компании</h2>
        <CursorGlow className="w-full">
          <div className="mt-10 flex flex-col">
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className={`group flex gap-6 rounded-control px-4 py-6 transition-colors duration-500 ease-smooth hover:bg-bg-card/40 sm:gap-10 ${i > 0 ? "border-t border-stroke-subtle" : ""}`}
              >
                <span className="w-20 shrink-0 font-heading text-h3 text-text-primary transition-colors duration-500 ease-smooth group-hover:text-accent-lime">
                  {item.year}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-h3 font-heading text-text-primary">{item.title}</h3>
                  <p className="text-sm text-text-secondary">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CursorGlow>
      </div>

      <div className="mt-section-mobile lg:mt-section-inner">
        <h2 className="text-h2 font-heading text-text-primary">Технологический процесс</h2>
        <div className="relative mt-10">
          {/* Соединительная линия — подчёркивает, что это один непрерывный процесс */}
          <div className="pointer-events-none absolute left-0 right-0 top-[46px] hidden h-px bg-accent-lime/25 lg:block" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {productionSteps.map((step, i) => (
              <div
                key={step.title}
                className="group relative flex min-w-0 flex-col gap-5 overflow-hidden rounded-card border border-stroke-subtle bg-bg-card/60 p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] backdrop-blur-md transition-all duration-700 ease-smooth will-change-transform hover:-translate-y-1.5 hover:border-accent-lime/40 hover:bg-bg-card-hover/70 hover:shadow-[0_0_60px_-18px_rgba(181,224,36,0.35),inset_0_1px_0_0_rgba(255,255,255,0.06)]"
              >
                <div className="flex items-center justify-between">
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-control border border-accent-lime/20 bg-accent-lime/10 transition-colors duration-500 ease-smooth group-hover:border-accent-lime/40 group-hover:bg-accent-lime/15">
                    <step.icon size={20} className="text-accent-lime" strokeWidth={1.75} />
                  </div>
                  <span className="font-heading text-sm text-text-tertiary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-heading leading-snug text-text-primary [hyphens:auto]">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-section-mobile lg:mt-section-inner">
        <h2 className="text-h2 font-heading text-text-primary">Команда</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => {
            const initials = member.name
              .split(" ")
              .map((part) => part[0])
              .join("");
            return (
              <div key={member.name} className="aspect-[3/4]">
                <ReflectiveCard name={member.name} role={member.role} initials={initials} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
