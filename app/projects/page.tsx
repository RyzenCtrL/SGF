import type { Metadata } from "next";
import Link from "next/link";
import { projectCategories, getProjectsByCategory } from "@/lib/projects-data";
import { ProjectCard } from "@/components/ui/project-card";
import { SectionKicker } from "@/components/ui/section-kicker";

export const metadata: Metadata = {
  title: "Реализованные проекты",
  description:
    "Портфолио уличных спортивных площадок Street Gym Factory: жилые комплексы, школы, парки и коммерческие объекты по всей России.",
};

const filterOptions = ["Все", ...projectCategories];

export default function ProjectsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const active = searchParams.category ?? "Все";
  const items = getProjectsByCategory(active);

  return (
    <div className="mx-auto max-w-container px-5 py-section-mobile md:px-8 lg:px-10 lg:py-section-inner">
      <div className="flex flex-col gap-4">
        <SectionKicker>Проекты</SectionKicker>
        <h1 className="max-w-prose text-h1 font-heading text-text-primary">
          Реализованные объекты по всей России
        </h1>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {filterOptions.map((option) => (
          <Link
            key={option}
            href={option === "Все" ? "/projects" : `/projects?category=${encodeURIComponent(option)}`}
            className={`flex h-10 items-center rounded-full border px-4 text-sm font-medium transition-colors duration-200 ${
              active === option
                ? "border-accent-lime bg-accent-lime text-accent-on-lime"
                : "border-stroke-subtle text-text-secondary hover:border-text-secondary hover:text-text-primary"
            }`}
          >
            {option}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
