import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import ProjectMedia from "@/components/ProjectMedia";
import FinalCTA from "@/components/sections/FinalCTA";
import { Container, PageHero, Reveal, Section, TiltCard } from "@/components/ui";
import { featuredProject, projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work | Exceed Enterprise Limited",
  description: "Fabrication, print, branding and custom software — a selection of work by Exceed.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Made to be noticed."
        lead="Fabrication, print, immersive branding and custom software — built for the people who'll see it every day."
      />

      <div className="mx-auto max-w-[1400px] px-3 md:px-6">
        <Reveal>
          <article className="relative bg-black h-[80svh] min-h-[560px] rounded-[36px] overflow-hidden border border-border">
            <ProjectMedia media={null} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-14 max-w-3xl">
              <div className="flex flex-wrap items-center gap-4 mb-5">
                <span className="rounded-full bg-primary/15 text-primary text-xs font-medium px-3 py-1">
                  {featuredProject.tag}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-foreground/60">
                  <MapPin className="w-4 h-4" /> {featuredProject.location}
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl text-foreground">{featuredProject.title}</h2>
              <p className="mt-5 text-lg text-foreground/70">{featuredProject.excerpt}</p>
            </div>
          </article>
        </Reveal>
      </div>

      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((project, idx) => (
              <Reveal key={project.client} delay={(idx % 2) * 100}>
                <TiltCard max={4}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-[1.5s] ease-out-expo group-hover/tilt:scale-105">
                      <ProjectMedia media={project.media} sizes="(min-width: 768px) 600px, 100vw" />
                    </div>
                  </div>
                  <div className="p-8">
                    <p className="eyebrow mb-3">
                      {project.category} · {project.client}
                    </p>
                    <h3 className="text-2xl md:text-3xl text-foreground">{project.title}</h3>
                    <p className="mt-3 text-muted-foreground leading-relaxed">{project.excerpt}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCTA />
    </>
  );
}
