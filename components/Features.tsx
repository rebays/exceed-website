"use client";

import Image from "next/image";
import {
  Globe,
  Zap,
  Rocket,
  Cpu,
  BarChart3,
  Shield,
} from "lucide-react";
import { Card, GradientText } from "@/components/ui";

const features = [
  {
    title: "Design & Branding",
    desc: "From corporate rebranding to social media marketing and photography.",
    icon: <Globe className="w-8 h-8" />,
    color: "from-cyan-500 to-blue-500",
    image: "/features/strategic-consulting.png"
  },
  {
    title: "Signage & Billboards",
    desc: "Manufacturing and installing high-quality LED signs, lightboxes, and billboards.",
    icon: <Zap className="w-8 h-8" />,
    color: "from-orange-500 to-red-500",
    image: "/features/advanced-technology.png"
  },
  {
    title: "Vehicle Wraps",
    desc: "Premium vehicle and boat wraps, one way vision, frosting, and stickers.",
    icon: <Rocket className="w-8 h-8" />,
    color: "from-blue-500 to-indigo-500",
    image: "/features/data-intelligence.png"
  },
  {
    title: "Software Development",
    desc: "Custom software solutions, web applications, and enterprise systems.",
    icon: <Cpu className="w-8 h-8" />,
    color: "from-indigo-500 to-purple-500",
    image: "/features/operational-velocity.png"
  },
  {
    title: "Print & Merchandise",
    desc: "Posters, business cards, PVC ID cards, t-shirts, and custom merchandise.",
    icon: <BarChart3 className="w-8 h-8" />,
    color: "from-purple-500 to-rose-500",
    image: "/features/data-intelligence.png"
  },
  {
    title: "Fabrication & Displays",
    desc: "Welding, fabrication, and premium WaveLight Media Displays.",
    icon: <Shield className="w-8 h-8" />,
    color: "from-rose-500 to-orange-500",
    image: "/features/advanced-technology.png"
  }
];

export default function Features() {
  return (
    <section id="services" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">
            Our Services
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            Solutions that Drive <GradientText>Results</GradientText>
          </h3>
          <p className="text-foreground/60 max-w-2xl text-lg">
            From bold branding to precision fabrication, we deliver a full suite
            of services built to set your business apart.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              radius="4xl"
              hoverable
              className="group flex flex-col overflow-hidden"
            >
              {/* Image Header */}
              <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20 z-10" />
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="p-8 pt-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500 relative z-20 -mt-12 border-4 border-background`}>
                  {feature.icon}
                </div>
                <h4 className="text-2xl font-bold mb-4">{feature.title}</h4>
                <p className="text-foreground/60 leading-relaxed text-sm">
                  {feature.desc}
                </p>
                <div className="mt-8 flex items-center gap-2 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Learn more
                  <div className="w-4 h-px bg-primary group-hover:w-8 transition-all" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
