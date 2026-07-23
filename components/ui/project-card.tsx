import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex aspect-[3/2] flex-col justify-end overflow-hidden rounded-card border border-stroke-subtle"
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover grayscale brightness-[0.85] transition-all duration-500 ease-smooth group-hover:scale-[1.04] group-hover:grayscale-0 group-hover:brightness-100"
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjMiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjMiIGZpbGw9IiMxZDIwMjEiLz48L3N2Zz4="
      />
      {/* Дуотон держит вразнобой стоковые фото в единой лайм-палитре, уходит на ховере */}
      <div className="pointer-events-none absolute inset-0 bg-accent-lime/[0.08] mix-blend-color transition-opacity duration-500 ease-smooth group-hover:opacity-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/20 to-transparent" />
      <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-bg-primary/60 px-3 py-1 text-caption uppercase tracking-wide text-text-primary backdrop-blur">
        {project.category}
      </span>
      <div className="relative flex flex-col gap-3 p-6">
        <div>
          <h3 className="line-clamp-2 text-h3 font-heading text-text-primary">{project.title}</h3>
          <p className="text-sm text-text-secondary">
            {project.city} · {project.year}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {project.metrics.map((metric) => (
            <span
              key={metric}
              className="rounded-full border border-transparent px-0 py-1 text-xs font-medium text-text-secondary transition-all duration-500 ease-smooth group-hover:border-white/15 group-hover:bg-bg-primary/50 group-hover:px-2.5 group-hover:text-text-primary group-hover:backdrop-blur-sm"
            >
              {metric}
            </span>
          ))}
        </div>
        <span className="flex items-center gap-2 text-sm font-medium text-accent-lime opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Смотреть кейс
          <span className="transition-transform duration-200 ease-smooth group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
