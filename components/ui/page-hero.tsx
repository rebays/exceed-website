import { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
}

/** Opening block for interior pages: quiet eyebrow, large metallic title, lead. */
export function PageHero({ eyebrow, title, lead }: PageHeroProps) {
  return (
    <header className="relative overflow-hidden pt-44 pb-24 md:pt-56 md:pb-32">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, rgba(12,176,208,0.35), transparent)" }}
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p className="eyebrow mb-6 animate-fade-up">{eyebrow}</p>
        <h1 className="text-5xl md:text-8xl text-metal animate-fade-up [animation-delay:100ms]">{title}</h1>
        <p className="mt-8 mx-auto max-w-2xl text-lg md:text-2xl text-muted-foreground leading-relaxed animate-fade-up [animation-delay:200ms]">
          {lead}
        </p>
      </div>
    </header>
  );
}
