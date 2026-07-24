import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionKicker } from "@/components/ui/section-kicker";
import { navLinks } from "@/lib/nav";
import { siteConfig } from "@/lib/site-config";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      {/* Тот же лаймовый акцент, что и в первом экране — чтобы страница не выпадала из системы */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-accent-lime/10 blur-[120px]" />

      <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-container flex-col justify-center px-5 py-section-mobile md:px-8 lg:px-10 lg:py-section-inner">
        <div className="flex max-w-prose flex-col gap-4">
          <SectionKicker>Ошибка 404</SectionKicker>

          <span
            className="font-heading text-display leading-none text-accent-lime"
            aria-hidden
          >
            404
          </span>

          <h1 className="text-h1 font-heading text-text-primary">Такой страницы нет</h1>

          <p className="text-body-lg text-text-secondary">
            Возможно, страницу перенесли или в адресе опечатка. Загляните в каталог
            оборудования или напишите нам — подскажем, что нужно под вашу площадку.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button href="/catalog" variant="primary">
              Перейти в каталог
            </Button>
            <Button href="/" variant="secondary">
              На главную
            </Button>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-stroke-subtle pt-6">
            <span className="text-caption uppercase tracking-wide text-text-secondary">
              Разделы сайта
            </span>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary transition-colors duration-200 hover:text-accent-lime"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <a
              href={siteConfig.phoneHref}
              className="text-sm text-text-secondary transition-colors duration-200 hover:text-accent-lime"
            >
              Или позвоните: {siteConfig.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
