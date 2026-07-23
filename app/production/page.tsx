import type { Metadata } from "next";
import { User } from "lucide-react";
import { timeline, productionSteps, team } from "@/lib/production-data";
import { siteConfig } from "@/lib/site-config";
import { SectionKicker } from "@/components/ui/section-kicker";

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
        <div className="mt-10 flex flex-col">
          {timeline.map((item, i) => (
            <div
              key={item.year}
              className={`flex gap-6 py-6 sm:gap-10 ${i > 0 ? "border-t border-stroke-subtle" : ""}`}
            >
              <span className="w-20 shrink-0 font-heading text-h3 text-text-primary">
                {item.year}
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-h3 font-heading text-text-primary">{item.title}</h3>
                <p className="text-sm text-text-secondary">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-section-mobile lg:mt-section-inner">
        <h2 className="text-h2 font-heading text-text-primary">Технологический процесс</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {productionSteps.map((step, i) => (
            <div key={step.title} className="flex flex-col gap-3 rounded-card border border-stroke-subtle bg-bg-card p-6">
              <span className="font-heading text-h3 text-text-tertiary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-h3 font-heading text-text-primary">{step.title}</h3>
              <p className="text-sm text-text-secondary">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-section-mobile lg:mt-section-inner">
        <h2 className="text-h2 font-heading text-text-primary">Команда</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="flex flex-col gap-4">
              <div className="flex aspect-square items-center justify-center rounded-card border border-stroke-subtle bg-bg-card">
                {/* TODO: реальное фото сотрудника */}
                <User size={32} className="text-text-tertiary" strokeWidth={1.2} />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">{member.name}</p>
                <p className="text-xs text-text-tertiary">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
