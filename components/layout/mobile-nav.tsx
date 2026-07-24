"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import { navLinks } from "@/lib/nav";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Портал в body: если меню рендерится внутри <header>, у которого при скролле
  // появляется backdrop-blur, position:fixed у потомков считается не от вьюпорта,
  // а от этого родителя — меню схлопывается в высоту хедера. Портал это обходит.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const pathname = usePathname();
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex flex-col bg-bg-primary p-6"
        >
          <div className="flex items-center justify-between">
            <span className="font-heading text-lg font-semibold text-text-primary">Меню</span>
            <button
              onClick={onClose}
              aria-label="Закрыть меню"
              className="flex h-11 w-11 items-center justify-center rounded-control border border-stroke-subtle text-text-primary"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="mt-12 flex flex-1 flex-col gap-3">
            {navLinks.map((link, i) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center justify-between rounded-2xl border px-6 py-4 font-heading text-h3 transition-colors duration-200",
                      active
                        ? "border-accent-lime/40 bg-accent-lime/10 text-text-primary"
                        : "border-stroke-subtle bg-bg-card/40 text-text-primary active:border-accent-lime/30 active:bg-bg-card"
                    )}
                  >
                    {link.label}
                    <ArrowRight size={20} className={active ? "text-accent-lime" : "text-text-tertiary"} />
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <div className="flex flex-col gap-3 pt-6">
            <a href={siteConfig.phoneHref} className="text-h3 font-heading text-text-primary">
              {siteConfig.phone}
            </a>
            <Button href="/contacts#form" onClick={onClose} className="w-full">
              Получить расчёт проекта
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
