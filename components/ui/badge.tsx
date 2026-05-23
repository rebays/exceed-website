import { HTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "success" | "warning" | "error" | "outline" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:  "bg-primary/15 text-primary border border-primary/30",
  secondary: "bg-secondary/15 text-secondary border border-secondary/30",
  success:  "bg-success/15 text-success border border-success/30",
  warning:  "bg-warning/15 text-warning border border-warning/30",
  error:    "bg-error/15 text-error border border-error/30",
  outline:  "bg-transparent text-foreground/70 border border-border",
  ghost:    "bg-accent/50 text-foreground/70 border border-border backdrop-blur-sm",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
  dot?: boolean;
  pulse?: boolean;
}

export function Badge({
  variant = "primary",
  dot = false,
  pulse = false,
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          <span
            className={`${pulse ? "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" : "hidden"} bg-current`}
          />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}
