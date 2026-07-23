"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { navLinks } from "@/lib/nav";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

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

          <nav className="mt-12 flex flex-1 flex-col gap-2">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.35 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block border-b border-stroke-subtle py-4 text-h3 font-heading text-text-primary"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
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
