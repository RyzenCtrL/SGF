import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Layers, ClipboardCheck } from "lucide-react";
import { getProductBySlug, getSimilarProducts, products } from "@/lib/catalog-data";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { StatRing } from "@/components/ui/stat-ring";
import { Reveal } from "@/components/ui/reveal";

const baseSpecMeta = [
  { icon: Layers, label: "Материал и покрытие" },
  { icon: ClipboardCheck, label: "Комплектация" },
];

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.name} — ${product.specs.join(", ")}. Цена от ${formatPrice(product.priceFrom)} ₽. Производство и монтаж под ключ.`,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const similar = getSimilarProducts(product);
  const specRows = [
    ...product.specs.map((value, i) => ({ ...baseSpecMeta[i], value })),
    ...(product.extraSpecs ?? []),
  ];

  return (
    <div className="mx-auto max-w-container px-5 py-section-mobile md:px-8 lg:px-10 lg:py-section-inner">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-stroke-subtle bg-bg-secondary">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-caption uppercase tracking-wide text-text-secondary">
              {product.category}
            </span>
            <h1 className="text-h1 font-heading text-text-primary">{product.name}</h1>
            <p className="text-h3 font-heading text-text-primary">
              от {formatPrice(product.priceFrom)} ₽
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {specRows.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-4 rounded-card border border-stroke-subtle bg-bg-card p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control border border-accent-lime/20 bg-accent-lime/10">
                  <Icon size={18} className="text-accent-lime" strokeWidth={1.75} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-caption uppercase tracking-wide text-text-secondary">{label}</span>
                  <span className="text-sm font-medium text-text-primary">{value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Button href="/contacts#form" variant="primary">
              В расчёт проекта
            </Button>
            <Button href="/catalog" variant="secondary" showArrow={false}>
              Весь каталог
            </Button>
          </div>
        </div>
      </div>

      {(product.highlight || product.ratings) && (
        <Reveal className="mt-section-mobile lg:mt-section-inner">
          <div className="rounded-card border border-stroke-subtle bg-bg-card p-6 md:p-10">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto]">
              <div className="flex flex-col gap-3">
                <h2 className="text-h3 font-heading text-text-primary">Почему стоит выбрать этот вариант</h2>
                {product.highlight && (
                  <p className="max-w-prose text-body text-text-secondary">{product.highlight}</p>
                )}
              </div>

              {product.ratings && (
                <div className="flex flex-wrap items-start justify-center gap-8 lg:justify-end">
                  {product.ratings.map((rating) => (
                    <StatRing key={rating.label} value={rating.value} label={rating.label} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {similar.length > 0 && (
        <div className="mt-section-mobile lg:mt-section-inner">
          <h2 className="text-h2 font-heading text-text-primary">Похожие товары</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {similar.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
