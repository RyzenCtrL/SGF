import { cn } from "@/lib/utils";

const GRAIN_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
      <filter id='n'>
        <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/>
        <feColorMatrix type='saturate' values='0'/>
      </filter>
      <rect width='100%' height='100%' filter='url(#n)'/>
    </svg>`
  );

export function GrainOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 mix-blend-soft-light", className)}
      style={{
        backgroundImage: `url("${GRAIN_SVG}")`,
        backgroundRepeat: "repeat",
        opacity: 0.12,
      }}
    />
  );
}
