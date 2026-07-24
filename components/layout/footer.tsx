import Link from "next/link";
import { Send, MessageCircle } from "lucide-react";
import { navLinks } from "@/lib/nav";
import { catalogCategories } from "@/lib/catalog-data";
import { siteConfig } from "@/lib/site-config";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-stroke-subtle bg-bg-secondary pb-20 pt-16 lg:pb-16">
      <div className="mx-auto max-w-container px-5 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-[280px] text-sm text-text-secondary">
              Производим и монтируем уличные спортивные площадки под ключ по всей России.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href={siteConfig.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="flex h-10 w-10 items-center justify-center rounded-control border border-stroke-subtle text-text-secondary transition-colors duration-200 hover:border-accent-lime hover:text-accent-lime"
              >
                <Send size={16} />
              </a>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-control border border-stroke-subtle text-text-secondary transition-colors duration-200 hover:border-accent-lime hover:text-accent-lime"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href={siteConfig.vk}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ВКонтакте"
                className="flex h-10 w-10 items-center justify-center rounded-control border border-stroke-subtle text-text-secondary transition-colors duration-200 hover:border-accent-lime hover:text-accent-lime"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M13.9 18.3c-6.2 0-9.8-4.3-9.9-11.4h3.2c.1 5.2 2.4 7.4 4.2 7.9V6.9h3v4.5c1.8-.2 3.6-2.3 4.2-4.5h3c-.5 2.7-2.5 4.8-3.9 5.7 1.4.6 3.7 2.5 4.6 5.7h-3.3c-.7-2.1-2.3-3.7-4.6-3.9v3.9h-.5z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-caption uppercase tracking-wide text-text-secondary">Меню</span>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-caption uppercase tracking-wide text-text-secondary">Каталог</span>
            {catalogCategories.map((category) => (
              <Link
                key={category}
                href={`/catalog?category=${encodeURIComponent(category)}`}
                className="text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary"
              >
                {category}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-caption uppercase tracking-wide text-text-secondary">Контакты</span>
            <a href={siteConfig.phoneHref} className="text-sm text-text-secondary hover:text-text-primary">
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="text-sm text-text-secondary hover:text-text-primary">
              {siteConfig.email}
            </a>
            <p className="text-sm text-text-secondary">{siteConfig.address}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-stroke-subtle pt-8 text-xs text-text-tertiary sm:flex-row sm:items-center sm:justify-between">
          <p>
            {siteConfig.legalName} · ИНН {siteConfig.inn} · ОГРН {siteConfig.ogrn}
          </p>
          <div className="flex gap-6">
            <span>© {new Date().getFullYear()} {siteConfig.name}</span>
            <Link href="/privacy" className="hover:text-text-secondary">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
