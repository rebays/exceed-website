import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectMedia from "@/components/ProjectMedia";
import { Container, Reveal, Section, SectionHeading } from "@/components/ui";
import { clients, projects } from "@/lib/content";

/** Full-bleed project panels that stack on top of each other as you scroll. */
export default function Work() {
  return (
    <Section id="work" className="pb-0! md:pb-0!">
      <Container>
        <SectionHeading eyebrow="Selected work" title="Built for the street, the screen and the stadium." />
      </Container>

      <div className="mx-auto max-w-[1400px] px-3 md:px-6">
        {projects.map((project, idx) => (
          <article
            key={project.client}
            className="sticky mb-6 md:mb-10 bg-black h-[78svh] min-h-[520px] rounded-[28px] md:rounded-[36px] overflow-hidden border border-border shadow-[0_-30px_80px_rgba(0,0,0,0.6)]"
            style={{ top: `calc(5rem + ${idx * 1.25}rem)` }}
          >
            <ProjectMedia media={project.media} sizes="(min-width: 1400px) 1400px, 100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

            <div className="absolute inset-x-0 bottom-0 p-8 md:p-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <p className="eyebrow text-foreground/70 mb-4">
                  {project.category} · {project.client}
                </p>
                <h3 className="text-3xl md:text-6xl text-foreground">{project.title}</h3>
                <p className="mt-4 text-base md:text-lg text-foreground/70 max-w-xl">{project.excerpt}</p>
              </div>
              <span className="eyebrow text-foreground/50 shrink-0">
                {String(idx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
            </div>
          </article>
        ))}
      </div>

      <Container className="py-24 md:py-32">
        <Reveal className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <p className="eyebrow">Trusted by</p>
            <ul className="flex flex-wrap justify-center gap-x-10 gap-y-3">
              {clients.map((client) => (
                <li key={client} className="text-2xl md:text-3xl font-semibold tracking-tight text-subtle-foreground">
                  {client}
                </li>
              ))}
            </ul>
          </div>
          <Link href="/portfolio" className="group inline-flex items-center gap-2 text-primary text-lg hover:underline underline-offset-4">
            All projects
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
