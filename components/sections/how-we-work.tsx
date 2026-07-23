"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { processSteps } from "@/lib/process-steps";
import { Reveal } from "@/components/ui/reveal";
import { SectionKicker } from "@/components/ui/section-kicker";
import { FileUploadCta } from "./file-upload-cta";

export function HowWeWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 40%"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="py-section-mobile md:py-section-inner lg:py-section-desktop">
      <div className="mx-auto max-w-container px-5 md:px-8 lg:px-10">
        <Reveal className="flex flex-col gap-4">
          <SectionKicker>Как мы работаем</SectionKicker>
          <h2 className="max-w-prose text-h2 font-heading text-text-primary">
            От заявки до сдачи объекта за {"30"} дней
          </h2>
        </Reveal>

        <div ref={sectionRef} className="relative mt-16">
          {/* десктоп: горизонтальная линия прогресса */}
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-stroke-subtle lg:block">
            <motion.div
              style={{ scaleX, transformOrigin: "left" }}
              className="h-full w-full bg-accent-lime"
            />
          </div>
          {/* мобайл/планшет: вертикальная линия прогресса */}
          <div className="absolute bottom-0 left-6 top-0 w-px bg-stroke-subtle lg:hidden">
            <motion.div
              style={{ scaleY: scaleX, transformOrigin: "top" }}
              className="h-full w-full bg-accent-lime"
            />
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-6">
            {processSteps.map((step) => (
              <div key={step.number} className="relative flex gap-5 pl-16 lg:flex-col lg:gap-4 lg:pl-0">
                <span className="absolute left-0 top-0 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-stroke-subtle bg-bg-primary font-heading text-sm text-text-primary lg:static">
                  {step.number}
                </span>
                <div className="flex flex-col gap-2 pt-1 lg:pt-3">
                  <h3 className="text-h3 font-heading text-text-primary">{step.title}</h3>
                  <p className="text-sm text-text-secondary">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <FileUploadCta />
        </div>
      </div>
    </section>
  );
}
