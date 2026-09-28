import Image from "next/image";
import { Car, CodeXml, Hammer, Palette, Printer, Signpost, type LucideIcon } from "lucide-react";
import { Container, Reveal, Section, SectionHeading, TiltCard } from "@/components/ui";
import { services, type ServiceIcon } from "@/lib/content";

const ICONS: Record<ServiceIcon, LucideIcon> = {
  brand: Palette,
  signage: Signpost,
  wrap: Car,
  software: CodeXml,
  print: Printer,
  fabrication: Hammer,
};

/** Bento layout — one entry per service, in content order. */
const LAYOUT: { span: string; image?: string }[] = [
  { span: "md:col-span-4", image: "/hero-image.jpg" },
  { span: "md:col-span-2" },
  { span: "md:col-span-2" },
  { span: "md:col-span-4" },
  { span: "md:col-span-3", image: "/printer.jpg" },
  { span: "md:col-span-3" },
];

export default function Services() {
  return (
    <Section id="services">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="We build brands. Then we give them somewhere to live."
          lead="Six disciplines under one roof — so the logo, the sign and the software all speak the same language."
        />

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5">
          {services.map((service, idx) => {
            const Icon = ICONS[service.icon];
            const { span, image } = LAYOUT[idx];
            return (
              <Reveal key={service.title} delay={(idx % 3) * 90} className={span}>
                <TiltCard className="min-h-[300px] md:min-h-[340px] p-8 md:p-10 flex flex-col justify-end">
                  {image && (
                    <>
                      <Image
                        src={image}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 66vw, 100vw"
                        className="object-cover opacity-40 transition-transform duration-[1.5s] ease-out-expo group-hover/tilt:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/10" />
                    </>
                  )}
                  <div className="relative">
                    <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center mb-6">
                      <Icon className="w-5 h-5 text-primary" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-2xl md:text-3xl text-foreground mb-3">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed max-w-md">{service.desc}</p>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
