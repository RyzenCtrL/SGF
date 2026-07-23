import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={className} aria-label="Street Gym Factory — на главную">
      <span className="flex items-center gap-2 font-heading text-lg font-semibold tracking-tight text-text-primary">
        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-lime text-sm font-semibold text-accent-on-lime">
          SGF
        </span>
        <span className="hidden sm:inline">Street Gym Factory</span>
      </span>
    </Link>
  );
}
