"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, X } from "lucide-react";
import { certificates, warranties } from "@/lib/certificates-data";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { SectionKicker } from "@/components/ui/section-kicker";
import { Counter } from "@/components/ui/counter";
import "@/components/ui/glare-hover.css";

export function Documents() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-bg-secondary py-section-mobile md:py-section-inner lg:py-section-desktop">
      <div className="mx-auto max-w-container px-5 md:px-8 lg:px-10">
        <Reveal className="flex flex-col gap-4">
          <SectionKicker>Документы и гарантии</SectionKicker>
          <h2 className="max-w-prose text-h2 font-heading text-text-primary">
            Сертификаты и официальные гарантии
          </h2>
        </Reveal>

        <Reveal
          stagger
          className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
        >
          {certificates.map((cert, index) => (
            <RevealItem key={cert.title}>
              <button
                onClick={() => setOpenIndex(index)}
                className="flex aspect-[3/4] w-full flex-col items-center justify-center gap-3 rounded-card border border-stroke-subtle bg-bg-card p-4 text-center transition-colors duration-200 hover:bg-bg-card-hover"
              >
                <FileText size={28} className="text-text-secondary" strokeWidth={1.5} />
                <span className="text-xs text-text-secondary">{cert.code}</span>
              </button>
            </RevealItem>
          ))}
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {warranties.map((item) => (
            <div
              key={item.label}
              className="glare-hover group flex flex-col gap-4 rounded-card border border-stroke-subtle bg-bg-card p-6 transition-colors duration-500 ease-smooth hover:border-accent-lime/30"
              style={
                {
                  "--gh-angle": "-45deg",
                  "--gh-rgba": "rgba(181, 224, 36, 0.28)",
                  "--gh-size": "220%",
                  "--gh-duration": "800ms",
                } as React.CSSProperties
              }
            >
              <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-control border border-accent-lime/20 bg-accent-lime/10 transition-colors duration-500 ease-smooth group-hover:border-accent-lime/40 group-hover:bg-accent-lime/15">
                <item.icon size={20} className="text-accent-lime" strokeWidth={1.75} />
              </div>
              <div className="relative z-10 flex flex-col gap-1">
                <span className="flex items-baseline gap-1.5">
                  <span className="text-h2 font-heading tabular-nums text-accent-lime">
                    <Counter value={item.years} />
                  </span>
                  <span className="font-heading text-lg text-text-primary">{item.unit}</span>
                </span>
                <span className="text-sm text-text-secondary">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary/90 p-6 backdrop-blur-sm"
            onClick={() => setOpenIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex aspect-[3/4] w-full max-w-sm flex-col items-center justify-center gap-4 rounded-card border border-stroke-subtle bg-bg-card p-10 text-center"
            >
              <button
                onClick={() => setOpenIndex(null)}
                aria-label="Закрыть"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-control border border-stroke-subtle text-text-primary"
              >
                <X size={18} />
              </button>
              <FileText size={48} className="text-text-secondary" strokeWidth={1.2} />
              <p className="text-h3 font-heading text-text-primary">
                {certificates[openIndex].title}
              </p>
              <p className="text-sm text-text-secondary">{certificates[openIndex].code}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
