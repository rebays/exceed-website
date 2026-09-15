import { Users } from "lucide-react";
import { Reveal } from "@/components/ui";

const leaders = [
  {
    name: "Simbi Jama",
    role: "Founder & CEO",
    bio: "15 years in enterprise strategy. The first and last eye on every project.",
  },
  {
    name: "Bradon Tupiti",
    role: "Chief Technology Officer",
    bio: "Pioneer in distributed systems and cloud architecture behind every software build.",
  },
  {
    name: "Carlos Saliga",
    role: "Head of Global Operations",
    bio: "Keeps scope, timeline, and fabrication schedules running without drama.",
  },
];

export default function Team() {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-8 text-center">
            The Team
          </p>
          <h2 className="text-4xl md:text-7xl text-center text-foreground mb-24 max-w-4xl mx-auto">
            The people you meet are the ones doing the work.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leaders.map((leader, idx) => (
            <Reveal key={leader.name} delay={idx * 100} className="group">
              <div className="w-full h-[320px] rounded-[1.5rem] bg-accent/40 border border-border mb-6 flex items-center justify-center overflow-hidden">
                <Users className="w-16 h-16 text-foreground/20" />
              </div>
              <h3 className="text-2xl text-foreground mb-1">{leader.name}</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">
                {leader.role}
              </p>
              <p className="text-foreground/60 text-sm leading-relaxed">{leader.bio}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
