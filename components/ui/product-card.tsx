import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { Button } from "./button";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-card border border-stroke-subtle bg-bg-card transition-colors duration-300 hover:bg-bg-card-hover">
      <Link href={`/catalog/${product.slug}`} className="relative aspect-[4/3] overflow-hidden bg-bg-secondary">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 ease-smooth group-hover:scale-[1.03]"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjMiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjMiIGZpbGw9IiMxZDIwMjEiLz48L3N2Zz4="
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="text-caption uppercase tracking-wide text-text-secondary">
          {product.category}
        </span>
        <Link href={`/catalog/${product.slug}`}>
          <h3 className="text-h3 font-heading text-text-primary">{product.name}</h3>
        </Link>
        <ul className="flex flex-col gap-1 text-sm text-text-secondary">
          {product.specs.map((spec) => (
            <li key={spec}>{spec}</li>
          ))}
        </ul>
        <p className="mt-auto pt-2 text-lg font-medium text-text-primary">
          от {formatPrice(product.priceFrom)} ₽
        </p>
        <div className="flex flex-col gap-2 pt-2">
          <Button href={`/catalog/${product.slug}`} variant="ghost" className="justify-start">
            Подробнее
          </Button>
          <div className="grid grid-rows-[0fr] transition-all duration-300 ease-smooth group-hover:grid-rows-[1fr]">
            <div className="overflow-hidden pt-1">
              <Button href="/contacts#form" variant="secondary" showArrow={false} className="h-11 w-full px-4 text-sm">
                В расчёт проекта
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
