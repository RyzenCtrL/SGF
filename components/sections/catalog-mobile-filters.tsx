"use client";

import { useState } from "react";
import Link from "next/link";
import { SlidersHorizontal, X, LayoutGrid } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { categoryIcons } from "@/lib/category-icons";

export function CatalogMobileFilters({
  categories,
  active,
}: {
  categories: string[];
  active?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-12 items-center gap-2 rounded-control border border-stroke-subtle px-4 text-sm text-text-primary lg:hidden"
      >
        <SlidersHorizontal size={16} />
        Фильтры
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end bg-bg-primary/80 lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full rounded-t-card border-t border-stroke-subtle bg-bg-secondary p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-h3 font-heading text-text-primary">Категории</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Закрыть"
                  className="flex h-10 w-10 items-center justify-center rounded-control border border-stroke-subtle text-text-primary"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="flex flex-col gap-1 pb-4">
                <Link
                  href="/catalog"
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-control px-3 py-3 text-sm transition-colors duration-200 ${
                    !active
                      ? "bg-accent-lime text-accent-on-lime"
                      : "text-text-secondary hover:bg-bg-card hover:text-text-primary"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-control ${
                      !active
                        ? "bg-accent-on-lime/10 text-accent-on-lime"
                        : "border border-stroke-subtle text-text-secondary"
                    }`}
                  >
                    <LayoutGrid size={16} strokeWidth={1.75} />
                  </span>
                  Все категории
                </Link>
                {categories.map((category) => {
                  const Icon = categoryIcons[category];
                  const isActive = active === category;
                  return (
                    <Link
                      key={category}
                      href={`/catalog?category=${encodeURIComponent(category)}`}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-control px-3 py-3 text-sm transition-colors duration-200 ${
                        isActive
                          ? "bg-accent-lime text-accent-on-lime"
                          : "text-text-secondary hover:bg-bg-card hover:text-text-primary"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-control ${
                          isActive
                            ? "bg-accent-on-lime/10 text-accent-on-lime"
                            : "border border-stroke-subtle text-text-secondary"
                        }`}
                      >
                        {Icon && <Icon size={16} strokeWidth={1.75} />}
                      </span>
                      {category}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
