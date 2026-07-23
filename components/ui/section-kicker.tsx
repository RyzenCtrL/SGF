// Заголовок-бейдж перед h1/h2 — та же рамка, что в hero
// (border-stroke-subtle + bg-card/50 + backdrop-blur + лаймовая точка),
// используется единообразно на каждой странице/секции.
export function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-stroke-subtle bg-bg-card/50 px-4 py-1.5 text-caption uppercase tracking-wide text-text-secondary backdrop-blur-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
      {children}
    </span>
  );
}
