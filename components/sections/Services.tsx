import { Reveal } from "@/components/ui";

const services = [
  {
    title: "Design & Branding",
    desc: "Corporate rebranding, social media marketing, and photography that gives your identity a consistent voice.",
  },
  {
    title: "Signage & Billboards",
    desc: "LED signs, lightboxes, and billboards manufactured and installed to hold up outdoors, at scale.",
  },
  {
    title: "Vehicle Wraps",
    desc: "Fleet, vehicle, and boat wraps, one-way vision, frosting, and stickers for brands on the move.",
  },
  {
    title: "Software Development",
    desc: "Custom software, web applications, and enterprise systems built around how the business actually runs.",
  },
  {
    title: "Print & Merchandise",
    desc: "Posters, business cards, PVC ID cards, t-shirts, and custom merchandise finished to spec.",
  },
  {
    title: "Fabrication & Displays",
    desc: "Welding, fabrication, and premium media displays for spaces that need to make an impression.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32 relative">
      <div className="container mx-auto px-6">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-8 text-center">
            Services
          </p>
          <h2 className="text-4xl md:text-7xl text-center text-foreground mb-24 max-w-4xl mx-auto">
            We build brands. Then we give them somewhere to live.
          </h2>
        </Reveal>

        <div className="flex flex-col">
          {services.map((service, idx) => (
            <Reveal key={service.title} delay={idx * 60}>
              <div className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center py-10 border-t border-border last:border-b hover:bg-accent/40 transition-colors px-4 -mx-4">
                <span className="md:col-span-1 text-secondary text-sm font-bold">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="md:col-span-4 text-2xl md:text-4xl text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="md:col-span-7 text-foreground/60 text-base md:text-lg leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
