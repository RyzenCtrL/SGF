import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjectBySlug, getSimilarProjects, projects } from "@/lib/projects-data";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ui/project-card";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: `${project.title} — ${project.city}, ${project.year}. ${project.metrics.join(", ")}.`,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const similar = getSimilarProjects(project);

  return (
    <div className="mx-auto max-w-container px-5 py-section-mobile md:px-8 lg:px-10 lg:py-section-inner">
      <div className="flex flex-col gap-4">
        <span className="text-caption uppercase tracking-wide text-text-secondary">
          {project.category} · {project.city} · {project.year}
        </span>
        <h1 className="max-w-prose text-h1 font-heading text-text-primary">{project.title}</h1>
      </div>

      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-card border border-stroke-subtle">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="100vw"
          className="object-cover grayscale brightness-[0.85]"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-accent-lime/[0.08] mix-blend-color" />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {project.metrics.map((metric) => (
          <div
            key={metric}
            className="rounded-card border border-stroke-subtle bg-bg-card p-6 text-h3 font-heading text-text-primary"
          >
            {metric}
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-prose text-body text-text-secondary">
        Объект реализован под ключ: проектирование, производство на собственном заводе,
        доставка и монтаж силами наших бригад. Гарантия на металлоконструкции — 5 лет.
      </p>

      <div className="mt-10">
        <Button href="/contacts#form" variant="primary">
          Обсудить похожий проект
        </Button>
      </div>

      {similar.length > 0 && (
        <div className="mt-section-mobile lg:mt-section-inner">
          <h2 className="text-h2 font-heading text-text-primary">Похожие проекты</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {similar.map((item) => (
              <ProjectCard key={item.slug} project={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
