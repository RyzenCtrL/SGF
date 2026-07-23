import { SectionKicker } from "@/components/ui/section-kicker";

// TODO: заменить плейсхолдеры на реальные логотипы клиентов (УК, застройщики, муниципалитеты)
const placeholderClients = [
  "Клиент 01",
  "Клиент 02",
  "Клиент 03",
  "Клиент 04",
  "Клиент 05",
  "Клиент 06",
  "Клиент 07",
  "Клиент 08",
];

function LogoRow() {
  return (
    <>
      {placeholderClients.map((client, i) => (
        <div
          key={i}
          className="flex h-16 w-40 shrink-0 items-center justify-center rounded-control border border-stroke-subtle text-sm text-text-secondary"
        >
          {client}
        </div>
      ))}
    </>
  );
}

export function TrustMarquee() {
  return (
    <section className="border-y border-stroke-subtle bg-bg-primary py-10">
      <div className="mx-auto max-w-container px-5 md:px-8 lg:px-10">
        <SectionKicker>Нам доверяют</SectionKicker>
      </div>
      <div className="relative mt-6 overflow-hidden">
        {/* Мягкое затухание логотипов у краёв ленты */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg-primary to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg-primary to-transparent md:w-32" />
        <div className="flex w-max gap-6 animate-marquee hover:[animation-play-state:paused]">
          <LogoRow />
          <LogoRow />
        </div>
      </div>
    </section>
  );
}
