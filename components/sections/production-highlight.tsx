import Image from "next/image";
import { Layers, PaintBucket, ClipboardCheck } from "lucide-react";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { SectionKicker } from "@/components/ui/section-kicker";

const facts = [
  {
    icon: Layers,
    title: "Сталь 09Г2С",
    description: "Низколегированная конструкционная сталь — устойчива к перепадам температур и нагрузкам.",
  },
  {
    icon: PaintBucket,
    title: "Порошковая окраска",
    description: "Полимерное покрытие наносится в камере и запекается при 200°C — не трескается и не выгорает.",
  },
  {
    icon: ClipboardCheck,
    title: "Контроль ОТК",
    description: "Каждая партия проходит проверку сварных швов и геометрии перед отгрузкой.",
  },
];

export function ProductionHighlight() {
  return (
    <section className="py-section-mobile md:py-section-inner lg:py-section-desktop">
      <div className="mx-auto max-w-container px-5 md:px-8 lg:px-10">
        <Reveal className="flex flex-col gap-4">
          <SectionKicker>Производство</SectionKicker>
          <h2 className="max-w-prose text-h2 font-heading text-text-primary">
            Свой завод — свои сроки и качество
          </h2>
        </Reveal>

        {/* TODO: заменить на реальное видео с производства (цех, сварка, покраска, ОТК) */}
        <Reveal className="relative mt-10 aspect-video overflow-hidden rounded-card border border-stroke-subtle bg-bg-card">
          <Image
            src="https://images.unsplash.com/photo-1714504904786-b6732390b206?auto=format&fit=crop&w=1600&q=80"
            alt="Производство Street Gym Factory"
            fill
            sizes="100vw"
            className="object-cover grayscale brightness-[0.85]"
          />
          <div className="pointer-events-none absolute inset-0 bg-accent-lime/[0.08] mix-blend-color" />
        </Reveal>

        <Reveal stagger className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {facts.map((fact) => (
            <RevealItem
              key={fact.title}
              className="flex flex-col gap-4 rounded-card border border-stroke-subtle bg-bg-card p-6 transition-colors duration-500 ease-smooth hover:border-accent-lime/30"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-control border border-accent-lime/20 bg-accent-lime/10">
                <fact.icon size={20} className="text-accent-lime" strokeWidth={1.75} />
              </div>
              <h3 className="text-h3 font-heading text-text-primary">{fact.title}</h3>
              <p className="text-sm text-text-secondary">{fact.description}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
