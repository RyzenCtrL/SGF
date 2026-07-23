"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { catalogCategories, getProductsByCategory } from "@/lib/catalog-data";
import { ProductCard } from "@/components/ui/product-card";
import { FilterPills } from "@/components/ui/filter-pills";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionKicker } from "@/components/ui/section-kicker";
import { CursorGlow } from "@/components/ui/cursor-glow";

const filterOptions = ["Все", ...catalogCategories];

export function CatalogShowcase() {
  const [active, setActive] = useState<string>("Все");
  const items = getProductsByCategory(active);
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", dragFree: true });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    emblaApi.scrollTo(0);
  }, [active, emblaApi]);

  return (
    <section className="overflow-hidden py-section-mobile md:py-section-inner lg:py-section-desktop">
      <CursorGlow className="w-full">
        <div className="mx-auto max-w-container px-5 md:px-8 lg:px-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <Reveal className="flex flex-col gap-4">
              <SectionKicker>Каталог</SectionKicker>
              <h2 className="max-w-prose text-h2 font-heading text-text-primary">
                Оборудование для любой площадки
              </h2>
            </Reveal>

            <div className="flex gap-3">
              <button
                onClick={scrollPrev}
                aria-label="Предыдущие товары"
                className="flex h-11 w-11 items-center justify-center rounded-control border border-stroke-subtle text-text-primary transition-colors duration-200 hover:border-accent-lime hover:text-accent-lime"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={scrollNext}
                aria-label="Следующие товары"
                className="flex h-11 w-11 items-center justify-center rounded-control border border-stroke-subtle text-text-primary transition-colors duration-200 hover:border-accent-lime hover:text-accent-lime"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="mt-10">
            <FilterPills options={filterOptions} active={active} onChange={setActive} />
          </div>

          <div className="mt-8 overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {items.map((product) => (
                <div
                  key={product.slug}
                  className="min-w-0 flex-[0_0_82%] sm:flex-[0_0_46%] lg:flex-[0_0_31%]"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/catalog" variant="primary">
              Весь каталог
            </Button>
            {/* TODO: подключить реальный PDF-файл прайс-каталога */}
            <Button href="/catalog.pdf" variant="secondary" showArrow={false}>
              Скачать PDF-каталог
            </Button>
          </div>
        </div>
      </CursorGlow>
    </section>
  );
}
