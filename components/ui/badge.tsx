import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-stroke-subtle px-3 py-1 text-caption uppercase tracking-wide text-text-secondary",
        className
      )}
    >
      {children}
    </span>
  );
}
