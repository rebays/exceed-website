import { HTMLAttributes } from "react";

type Variant = "glass" | "solid" | "outline";
type Radius = "xl" | "2xl" | "3xl" | "4xl";

const variantClasses: Record<Variant, string> = {
  glass:   "glass border-border/50",
  solid:   "bg-card border border-border/50",
  outline: "bg-transparent border border-border/50",
};

const radiusClasses: Record<Radius, string> = {
  xl:   "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  "4xl": "rounded-[2.5rem]",
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  radius?: Radius;
  hoverable?: boolean;
}

export function Card({
  variant = "glass",
  radius = "3xl",
  hoverable = false,
  className = "",
  ...props
}: CardProps) {
  const hoverClasses = hoverable
    ? "hover:border-primary/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 cursor-pointer"
    : "";

  return (
    <div
      className={`${variantClasses[variant]} ${radiusClasses[radius]} ${hoverClasses} ${className}`}
      {...props}
    />
  );
}
