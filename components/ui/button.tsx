import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg" | "icon";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/20 active:scale-95",
  secondary:
    "bg-secondary hover:bg-secondary-hover text-white shadow-lg shadow-secondary/20 active:scale-95",
  ghost:
    "bg-transparent hover:bg-accent/50 text-foreground/80 hover:text-foreground",
  outline:
    "glass text-foreground/80 hover:text-foreground hover:border-primary/50",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-8 py-4",
  lg: "px-10 py-5 text-lg",
  icon: "p-2.5",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
  className = "",
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return `inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
}
