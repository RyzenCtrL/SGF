"use client";

import { cn } from "@/lib/utils";

export function FilterPills({
  options,
  active,
  onChange,
}: {
  options: string[];
  active: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist">
      {options.map((option) => {
        const isActive = option === active;
        return (
          <button
            key={option}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option)}
            className={cn(
              "h-10 rounded-full border px-4 text-sm font-medium transition-colors duration-200",
              isActive
                ? "border-accent-lime bg-accent-lime text-accent-on-lime"
                : "border-stroke-subtle bg-transparent text-text-secondary hover:border-text-secondary hover:text-text-primary"
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
