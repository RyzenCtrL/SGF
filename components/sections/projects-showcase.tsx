"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projectCategories, getProjectsByCategory } from "@/lib/projects-data";
import { ProjectCard } from "@/components/ui/project-card";
import { FilterPills } from "@/components/ui/filter-pills";
import { Reveal } from "@/components/ui/reveal";
import { SectionKicker } from "@/components/ui/section-kicker";

const filterOptions = ["Все", ...projectCategories];

export function ProjectsShowcase() {
  const [active, setActive] = useState<string>("Все");
  const items = getProjectsByCategory(active);

  return (
    <section className="bg-bg-secondary py-section-mobile md:py-section-inner lg:py-section-desktop">
      <div className="mx-auto max-w-container px-5 md:px-8 lg:px-10">
        <Reveal className="flex flex-col gap-4">
          <SectionKicker>Проекты</SectionKicker>
          <h2 className="max-w-prose text-h2 font-heading text-text-primary">
            Реализованные объекты по всей России
          </h2>
        </Reveal>

        <div className="mt-10">
          <FilterPills options={filterOptions} active={active} onChange={setActive} />
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {items.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
