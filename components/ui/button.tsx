import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface BaseProps {
  variant?: ButtonVariant;
  showArrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "group inline-flex items-center justify-center gap-2 rounded-control font-body font-medium text-base transition-all duration-500 ease-smooth will-change-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-lime disabled:opacity-40 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "h-14 px-7 bg-accent-lime text-accent-on-lime hover:bg-accent-lime-hover hover:-translate-y-0.5 active:translate-y-0 active:bg-accent-lime-pressed",
  secondary:
    "h-14 px-7 bg-bg-card/40 text-text-primary border border-stroke-subtle backdrop-blur-sm hover:border-text-primary hover:bg-bg-card hover:-translate-y-0.5 active:translate-y-0",
  ghost: "h-auto px-0 py-1 bg-transparent text-text-primary hover:text-accent-lime",
};

function ArrowIcon({ variant }: { variant: ButtonVariant }) {
  return (
    <ArrowRight
      size={variant === "ghost" ? 16 : 18}
      className="transition-transform duration-500 ease-smooth group-hover:translate-x-1"
    />
  );
}

export function Button(props: ButtonProps) {
  const { variant = "primary", showArrow = true, className, children, ...rest } = props;
  const classes = cn(base, variants[variant], className);

  if ("href" in props && props.href) {
    return (
      <Link className={classes} {...(rest as React.ComponentProps<typeof Link>)}>
        {children}
        {showArrow && <ArrowIcon variant={variant} />}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
      {showArrow && <ArrowIcon variant={variant} />}
    </button>
  );
}
