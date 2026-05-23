import { HTMLAttributes } from "react";

type Padding = "sm" | "md" | "lg";

const paddingClasses: Record<Padding, string> = {
  sm: "py-16",
  md: "py-24",
  lg: "py-32",
};

interface SectionProps extends HTMLAttributes<HTMLElement> {
  padding?: Padding;
  as?: "section" | "div" | "article";
}

export function Section({
  padding = "lg",
  as: Tag = "section",
  className = "",
  ...props
}: SectionProps) {
  return (
    <Tag
      className={`relative overflow-hidden ${paddingClasses[padding]} ${className}`}
      {...props}
    />
  );
}

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  narrow?: boolean;
}

export function Container({
  narrow = false,
  className = "",
  ...props
}: ContainerProps) {
  return (
    <div
      className={`container mx-auto px-6 ${narrow ? "max-w-4xl" : ""} ${className}`}
      {...props}
    />
  );
}
