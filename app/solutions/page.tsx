import { Cpu, Globe, Zap } from "lucide-react";
import { Reveal } from "@/components/ui";

const solutions = [
  {
    title: "Design & Brand Services",
    desc: "Comprehensive branding and design services to elevate your corporate identity and engage your audience effectively.",
    icon: <Globe className="w-7 h-7" />,
    features: ["Design & corporate rebranding", "Social media marketing & management", "Photography & high-res scanning", "Sport venue branding & consultancy", "Welding & fabrication", "Billboard & signage installation"],
  },
  {
    title: "Premium Products",
    desc: "High-quality physical products ranging from large-scale signs and billboards to bespoke merchandise and apparel.",
    icon: <Zap className="w-7 h-7" />,
    features: ["Signs, banners & billboards", "LEDs & LED lightboxes", "Channel letters & vehicle/boat wraps", "Flyers, posters, and books", "PVC ID/business cards & t-shirts", "WaveLight media displays"],
  },
  {
    title: "Software Development",
    desc: "Cutting-edge software engineering tailored to your business needs, from enterprise applications to custom development.",
    icon: <Cpu className="w-7 h-7" />,
    features: ["Custom software solutions", "Web & mobile applications", "Enterprise systems"],
  },
];

export default function SolutionsPage() {
  return (
    <div className="flex flex-col min-h-screen pt-40 pb-24 relative">
      <div className="container mx-auto px-6">
        <Reveal className="max-w-3xl mb-24">
          <h1 className="text-5xl md:text-8xl text-foreground mb-6">Solutions</h1>
          <p className="text-lg md:text-xl text-foreground/60 leading-relaxed">
            We deliver a comprehensive suite of high-impact services designed to address the
            unique demands of modern enterprise environments.
          </p>
        </Reveal>

        <div className="flex flex-col">
          {solutions.map((solution, idx) => (
            <Reveal key={solution.title} delay={idx * 100} className="border-t border-border last:border-b py-16">
              <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/3 space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center text-primary">
                    {solution.icon}
                  </div>
                  <h3 className="text-3xl md:text-4xl text-foreground">{solution.title}</h3>
                  <p className="text-foreground/60 leading-relaxed">{solution.desc}</p>
                </div>
                <ul className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 border-b border-border/50 pb-4">
                      <span className="text-secondary text-xs font-bold shrink-0">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="font-medium text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
