import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <label htmlFor={inputId} className="flex flex-col gap-2">
        <span className="text-caption uppercase tracking-wide text-text-secondary">
          {label}
        </span>
        <textarea
          id={inputId}
          ref={ref}
          rows={4}
          className={cn(
            "resize-none rounded-control border bg-bg-secondary px-4 py-3 text-body text-text-primary placeholder:text-text-tertiary outline-none transition-colors duration-200",
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
Textarea.displayName = "Textarea";
