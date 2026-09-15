import { Users } from "lucide-react";
import { Reveal } from "@/components/ui";

export default function AboutPage() {
  const stats = [
    { label: "Founded", value: "2015" },
    { label: "Regional Offices", value: "8" },
    { label: "Enterprise Clients", value: "150+" },
    { label: "Industry Awards", value: "24" },
  ];

  const leaders = [
    { name: "Simbi Jama", role: "Chief Executive Officer", bio: "CEO of Exceed Enterprise Limited with 15 years in enterprise strategy." },
    { name: "Bradon Tupiti", role: "Chief Technology Officer", bio: "Pioneer in distributed systems and cloud architecture." },
    { name: "Carlos Saliga", role: "Head of Global Operations", bio: "Expert in operational scaling and cross-border expansion." },
  ];

  return (
    <div className="flex flex-col min-h-screen pt-40 pb-24 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <Reveal className="max-w-4xl mx-auto text-center mb-32">
          <p className="text-secondary font-bold tracking-[0.3em] uppercase text-xs mb-6">Our Story</p>
          <h1 className="text-5xl md:text-8xl text-foreground mb-8">
            Redefining <span className="text-primary">Excellence</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/60 leading-relaxed max-w-2xl mx-auto">
            Exceed Enterprise Limited was founded on the principle that businesses should
            never have to settle for &ldquo;good enough.&rdquo; We push the boundaries of
            what&apos;s possible in design, fabrication, and software.
          </p>
        </Reveal>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <Reveal className="border border-border rounded-[2rem] p-10 md:p-12 bg-accent/20">
            <h3 className="text-3xl text-foreground mb-4">Our Vision</h3>
            <p className="text-foreground/60 text-lg leading-relaxed">
              To be trusted, innovative and profitable.
            </p>
          </Reveal>
          <Reveal delay={80} className="border border-border rounded-[2rem] p-10 md:p-12 bg-accent/20">
            <h3 className="text-3xl text-foreground mb-4">Our Mission</h3>
            <p className="text-foreground/60 text-lg leading-relaxed">
              To deliver and exceed customer expectations.
            </p>
          </Reveal>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
          {stats.map((stat, idx) => (
            <Reveal key={stat.label} delay={idx * 80} className="text-center border-t border-border pt-6">
              <p className="text-primary text-5xl md:text-6xl mb-2">{stat.value}</p>
              <p className="text-foreground/50 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            </Reveal>
          ))}
        </div>

        {/* Leadership */}
        <div>
          <Reveal className="text-center mb-16">
            <p className="text-secondary font-bold tracking-[0.3em] uppercase text-xs mb-6">The Team</p>
            <h2 className="text-4xl md:text-6xl text-foreground mb-4">Leadership</h2>
            <p className="text-foreground/60 text-lg">Guided by industry veterans with a proven track record.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leaders.map((leader, idx) => (
              <Reveal key={leader.name} delay={idx * 100} className="group">
                <div className="w-full h-[360px] rounded-[1.5rem] mb-6 bg-accent/40 border border-border flex items-center justify-center">
                  <Users className="w-20 h-20 text-foreground/20" />
                </div>
                <h4 className="text-2xl text-foreground mb-1 group-hover:text-primary transition-colors">
                  {leader.name}
                </h4>
                <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-3">{leader.role}</p>
                <p className="text-foreground/60 text-sm leading-relaxed">{leader.bio}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
