import type { Metadata } from "next";
import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { catalogCategories, products, getProductsByCategory } from "@/lib/catalog-data";
import { categoryIcons } from "@/lib/category-icons";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { CatalogMobileFilters } from "@/components/sections/catalog-mobile-filters";
import { SectionKicker } from "@/components/ui/section-kicker";

export const metadata: Metadata = {
  title: "Каталог уличного спортивного оборудования",
  description:
    "Воркаут-комплексы, уличные тренажёры, тренажёры переменной нагрузки, парковое оборудование и покрытия. Цены от производителя, монтаж под ключ по всей России.",
};

export default function CatalogPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const active = searchParams.category;
  const items = active ? getProductsByCategory(active) : products;

  return (
    <div className="mx-auto max-w-container px-5 py-section-mobile md:px-8 lg:px-10 lg:py-section-inner">
      <div className="flex flex-col gap-4">
        <SectionKicker>Каталог</SectionKicker>
        <h1 className="max-w-prose text-h1 font-heading text-text-primary">
          Оборудование для уличных спортивных площадок
        </h1>
      </div>

      <div className="mt-6 lg:hidden">
        <CatalogMobileFilters categories={[...catalogCategories]} active={active} />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="hidden flex-col gap-1 lg:flex">
          <Link
            href="/catalog"
            className={`flex items-center gap-3 rounded-control px-3 py-2 text-sm transition-colors duration-200 ${
              !active
                ? "bg-accent-lime text-accent-on-lime"
                : "text-text-secondary hover:bg-bg-card hover:text-text-primary"
            }`}
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-control ${
                !active
                  ? "bg-accent-on-lime/10 text-accent-on-lime"
                  : "border border-stroke-subtle text-text-secondary"
              }`}
            >
              <LayoutGrid size={15} strokeWidth={1.75} />
            </span>
            Все категории
          </Link>
          {catalogCategories.map((category) => {
            const Icon = categoryIcons[category];
            const isActive = active === category;
            return (
              <Link
                key={category}
                href={`/catalog?category=${encodeURIComponent(category)}`}
                className={`flex items-center gap-3 rounded-control px-3 py-2 text-sm transition-colors duration-200 ${
                  isActive
                    ? "bg-accent-lime text-accent-on-lime"
                    : "text-text-secondary hover:bg-bg-card hover:text-text-primary"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-control ${
                    isActive
                      ? "bg-accent-on-lime/10 text-accent-on-lime"
                      : "border border-stroke-subtle text-text-secondary"
                  }`}
                >
                  {Icon && <Icon size={15} strokeWidth={1.75} />}
                </span>
                {category}
              </Link>
            );
          })}
        </aside>

        <div>
          {items.length === 0 ? (
            <p className="text-text-secondary">В этой категории пока нет позиций.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/contacts#form" variant="primary">
              Получить расчёт проекта
            </Button>
            {/* TODO: подключить реальный PDF-файл прайс-каталога */}
            <Button href="/catalog.pdf" variant="secondary" showArrow={false}>
              Скачать PDF-каталог
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
