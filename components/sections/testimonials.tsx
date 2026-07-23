"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/testimonials-data";
import { Reveal } from "@/components/ui/reveal";
import { SectionKicker } from "@/components/ui/section-kicker";

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="bg-bg-secondary py-section-mobile md:py-section-inner lg:py-section-desktop">
      <div className="mx-auto max-w-container px-5 md:px-8 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal className="flex flex-col gap-4">
            <SectionKicker>Отзывы</SectionKicker>
            <h2 className="max-w-prose text-h2 font-heading text-text-primary">
              Что говорят наши заказчики
            </h2>
          </Reveal>

          <div className="flex gap-3">
            <button
              onClick={scrollPrev}
              aria-label="Предыдущий отзыв"
              className="flex h-11 w-11 items-center justify-center rounded-control border border-stroke-subtle text-text-primary transition-colors duration-200 hover:border-accent-lime hover:text-accent-lime"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Следующий отзыв"
              className="flex h-11 w-11 items-center justify-center rounded-control border border-stroke-subtle text-text-primary transition-colors duration-200 hover:border-accent-lime hover:text-accent-lime"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="mt-10 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {testimonials.map((item) => (
              <div
                key={item.name}
                className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
              >
                <div className="flex h-full flex-col gap-6 rounded-card border border-stroke-subtle bg-bg-card p-8">
                  <Quote className="text-accent-lime" size={28} strokeWidth={1.5} />
                  <p className="flex-1 text-body text-text-secondary">{item.quote}</p>
                  <div className="flex items-center gap-3 border-t border-stroke-subtle pt-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bg-secondary font-heading text-sm text-text-primary">
                      {item.name.charAt(0)}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-text-primary">{item.name}</span>
                      <span className="text-xs text-text-secondary">
                        {item.role} · {item.city}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          {testimonials.map((item, i) => (
            <span
              key={item.name}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === selectedIndex ? "w-6 bg-accent-lime" : "w-1.5 bg-stroke-subtle"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
