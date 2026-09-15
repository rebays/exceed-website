import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui";

const projects = [
  { title: "Global Retail Co.", category: "Rebranding & Signage" },
  { title: "TransNational Freight", category: "Software Development" },
  { title: "City Services Group", category: "Vehicle Fleet Wraps" },
  { title: "Metro Sports Arena", category: "Venue Branding" },
];

export default function SelectedProjects() {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-4">
              Selected Projects
            </p>
            <h2 className="text-4xl md:text-6xl text-foreground max-w-2xl">
              A curated selection of results-driven client work.
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary shrink-0"
          >
            More Projects
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </Reveal>

        <div className="flex flex-col">
          {projects.map((project, idx) => (
            <Reveal key={project.title} delay={idx * 80}>
              <Link
                href="/portfolio"
                className="group flex items-center justify-between py-8 border-t border-border last:border-b hover:bg-accent/40 transition-colors px-4 -mx-4"
              >
                <div className="flex items-center gap-6">
                  <span className="text-secondary text-sm font-bold">{String(idx + 1).padStart(2, "0")}</span>
                  <h3 className="text-2xl md:text-4xl text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </div>
                <div className="flex items-center gap-6">
                  <span className="hidden sm:block text-xs font-bold uppercase tracking-widest text-foreground/40">
                    {project.category}
                  </span>
                  <ArrowUpRight className="w-6 h-6 text-foreground/40 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
