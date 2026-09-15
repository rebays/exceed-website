import { ArrowUpRight, ImageIcon, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui";

const projects = [
  {
    category: "Rebranding & Signage",
    title: "Complete Corporate Identity Overhaul",
    client: "Global Retail Co",
    excerpt: "Executed full corporate rebranding including high-resolution signage installation, storefront channel letters, and WaveLight media displays.",
  },
  {
    category: "Software Development",
    title: "Custom Inventory & Logistics Portal",
    client: "TransNational Freight",
    excerpt: "Engineered a bespoke web application optimizing real-time tracking, reducing processing delays by 34%.",
  },
  {
    category: "Vehicle Fleet Wraps",
    title: "Nationwide Fleet Branding",
    client: "City Services Group",
    excerpt: "Designed, printed, and installed high-durability vehicle wraps for a fleet of 500+ commercial vans and trucks.",
  },
  {
    category: "Sports Venue Branding",
    title: "Stadium LED & Branding Installation",
    client: "Metro Sports Arena",
    excerpt: "Procured and installed massive LED lightboxes, A-Frames, and stadium-wide one-way vision frosting under a tight deadline.",
  },
];

export default function PortfolioPage() {
  return (
    <div className="flex flex-col min-h-screen pt-40 pb-24 relative">
      <div className="container mx-auto px-6">
        <Reveal className="max-w-3xl mb-24">
          <ImageIcon className="w-10 h-10 text-primary mb-6" />
          <h1 className="text-5xl md:text-8xl text-foreground mb-6">Our Portfolio</h1>
          <p className="text-lg md:text-xl text-foreground/60 leading-relaxed">
            A showcase of our premium physical fabrication, high-quality printing, immersive
            branding, and custom software solutions.
          </p>
        </Reveal>

        {/* Featured Project */}
        <Reveal className="mb-24">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Featured Work
          </h2>
          <div className="border border-border rounded-[2rem] overflow-hidden bg-accent/20 flex flex-col lg:flex-row">
            <div className="lg:w-1/2 relative min-h-[280px] lg:min-h-[380px] bg-accent/50">
              <div className="absolute inset-0 bg-grid opacity-40" />
            </div>
            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-primary/15 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Full Service
                </span>
                <span className="text-foreground/50 text-sm flex items-center gap-1 font-medium">
                  <MapPin className="w-4 h-4" /> Global Tech HQ
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl text-foreground mb-4">
                Integrated Digital & Physical Branding Experience
              </h3>
              <p className="text-foreground/60 text-lg leading-relaxed">
                From high-end LED lightboxes and architectural frosting to custom merchandising
                and a tailor-made digital check-in system, we provided a complete holistic
                solution for their headquarters opening.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Selected Works */}
        <div>
          <Reveal>
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-8">
              Selected Projects
            </h2>
          </Reveal>
          <div className="flex flex-col">
            {projects.map((item, idx) => (
              <Reveal
                key={item.title}
                delay={idx * 80}
                className="group border-t border-border last:border-b py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start"
              >
                <span className="md:col-span-1 text-secondary text-sm font-bold">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="md:col-span-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-secondary mb-2">
                    {item.category}
                  </p>
                  <h4 className="text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                </div>
                <p className="md:col-span-6 text-foreground/60 leading-relaxed">{item.excerpt}</p>
                <div className="md:col-span-1 flex md:justify-end items-center gap-2 text-foreground/40">
                  <span className="text-xs">{item.client}</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
