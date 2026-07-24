import { SectionKicker } from "@/components/ui/section-kicker";

// Демо-проект: заказчики вымышленные, но намеренно совпадают с кейсами
// в разделе «Проекты» и с отзывами — чтобы сайт читался как единая история.
const clients = [
  { type: "УК и ТСЖ", name: "«Северное Домоуправление»" },
  { type: "Застройщик", name: "ГК «Речной квартал»" },
  { type: "Образование", name: "Гимназия №15" },
  { type: "Жилой комплекс", name: "«Янтарный берег»" },
  { type: "Муниципалитет", name: "Тюменский район" },
  { type: "Коммерция", name: "Бизнес-парк «Сокол»" },
  { type: "Образование", name: "Школа №1520" },
  { type: "Городская среда", name: "Парк Победы" },
];

function LogoRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex gap-6" aria-hidden={hidden || undefined}>
      {clients.map((client) => (
        <div
          key={client.name + client.type}
          className="flex h-16 w-52 shrink-0 flex-col items-center justify-center gap-1 rounded-control border border-stroke-subtle px-3 text-center transition-colors duration-300 hover:border-accent-lime/30"
        >
          <span className="text-[10px] uppercase tracking-[0.14em] text-text-tertiary">
            {client.type}
          </span>
          <span className="text-[13px] font-medium leading-tight text-text-secondary">
            {client.name}
          </span>
        </div>
      ))}
    </div>
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
          {/* Вторая копия нужна только для бесшовной прокрутки — скринридеру не отдаём */}
          <LogoRow hidden />
        </div>
      </div>
    </section>
  );
}
