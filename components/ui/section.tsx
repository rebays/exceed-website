import { HTMLAttributes, ReactNode } from "react";
import { Reveal } from "./reveal";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "div";
}

export function Section({ as: Tag = "section", className = "", ...props }: SectionProps) {
  return <Tag className={`relative py-28 md:py-40 ${className}`} {...props} />;
}

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  narrow?: boolean;
}

export function Container({ narrow = false, className = "", ...props }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-6 ${narrow ? "max-w-3xl" : "max-w-[1200px]"} ${className}`}
      {...props}
    />
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "left";
  className?: string;
}

/** The standard eyebrow / headline / lead block that opens most sections. */
export function SectionHeading({ eyebrow, title, lead, align = "center", className = "" }: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";

  return (
    <Reveal className={`flex flex-col max-w-3xl mb-16 md:mb-24 ${alignment} ${className}`}>
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <h2 className="text-4xl md:text-6xl text-metal">{title}</h2>
      {lead && <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">{lead}</p>}
    </Reveal>
  );
}
