import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <label htmlFor={inputId} className="flex flex-col gap-2">
        <span className="text-caption uppercase tracking-wide text-text-secondary">
          {label}
        </span>
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "h-14 rounded-control border bg-bg-secondary px-4 text-body text-text-primary placeholder:text-text-tertiary outline-none transition-colors duration-200",
            error
              ? "border-state-error"
              : "border-stroke-subtle focus:border-accent-lime focus:ring-1 focus:ring-accent-lime",
            className
          )}
          aria-invalid={!!error}
          {...props}
        />
        {error && <span className="text-sm text-state-error">{error}</span>}
      </label>
    );
  }
);
Input.displayName = "Input";
