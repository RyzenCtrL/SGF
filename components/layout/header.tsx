"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { navLinks } from "@/lib/nav";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { Logo } from "./logo";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Прозрачная шапка над hero → матовое стекло при скролле.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 h-20 transition-colors duration-300",
        scrolled
          ? "border-b border-stroke-subtle bg-bg-primary/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      {/* Тонкая лаймовая линия-шиммер под шапкой при скролле */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-lime/40 to-transparent transition-opacity duration-300",
          scrolled ? "opacity-100" : "opacity-0"
        )}
      />

      <div className="mx-auto flex h-full max-w-container items-center justify-between px-5 md:px-8 lg:px-10">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <a
            href={siteConfig.phoneHref}
            className="text-sm font-medium text-text-primary transition-colors duration-200 hover:text-accent-lime"
          >
            {siteConfig.phone}
          </a>
          <Button href="/contacts#form" className="h-11 px-5 text-sm">
            Получить расчёт
          </Button>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <a
            href={siteConfig.phoneHref}
            aria-label="Позвонить"
            className="flex h-11 w-11 items-center justify-center rounded-control border border-stroke-subtle bg-bg-card/40 text-text-primary backdrop-blur-sm"
          >
            <Phone size={18} />
          </a>
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Открыть меню"
            className="flex h-11 w-11 items-center justify-center rounded-control border border-stroke-subtle bg-bg-card/40 text-text-primary backdrop-blur-sm"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
