"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Mail, Phone, MapPin, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Input } from "@/components/ui";

interface QuoteWizardProps {
  isOpen: boolean;
  onClose: () => void;
  initialTier: string;
}

const PROJECT_TYPES = [
  { id: "brand", label: "Brand & Identity", base: [3000, 8000] as const },
  { id: "signage", label: "Signage & Fabrication", base: [4000, 12000] as const },
  { id: "software", label: "Web & Software", base: [6000, 20000] as const },
  { id: "full", label: "Full-Scope / Multiple", base: [10000, 35000] as const },
];

const SCOPES = [
  { id: "single", label: "Single workstream", desc: "One clearly defined deliverable.", multiplier: 1 },
  { id: "multiple", label: "Multiple workstreams", desc: "Several related deliverables in parallel.", multiplier: 1.5 },
  { id: "full", label: "Full end-to-end", desc: "Complex, senior-led execution across the project.", multiplier: 2.2 },
];

const TIMELINES = [
  { id: "standard", label: "Standard", desc: "Regular scheduling.", multiplier: 1 },
  { id: "expedited", label: "Expedited", desc: "Priority scheduling, faster turnaround.", multiplier: 1.3 },
];

const TIER_SCOPE: Record<string, string> = {
  Project: "single",
  Advanced: "multiple",
  Signature: "full",
};

function roundTo(value: number, step: number) {
  return Math.round(value / step) * step;
}

function formatUSD(value: number) {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

const STEP_LABELS = ["Project", "Scope", "Timeline", "Contact", "Estimate"];

export function QuoteWizard({ isOpen, onClose, initialTier }: QuoteWizardProps) {
  const [step, setStep] = useState(0);
  const [projectType, setProjectType] = useState<string | null>(null);
  const [scope, setScope] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setStep(0);
      setProjectType(null);
      setScope(TIER_SCOPE[initialTier] ?? "single");
      setTimeline("standard");
      setName("");
      setEmail("");
      setCompany("");
      setNotes("");
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen, initialTier]);

  const estimate = useMemo(() => {
    const type = PROJECT_TYPES.find((t) => t.id === projectType);
    const scopeInfo = SCOPES.find((s) => s.id === scope);
    const timelineInfo = TIMELINES.find((t) => t.id === timeline);
    if (!type || !scopeInfo || !timelineInfo) return null;

    const [min, max] = type.base;
    const multiplier = scopeInfo.multiplier * timelineInfo.multiplier;
    return {
      min: roundTo(min * multiplier, 100),
      max: roundTo(max * multiplier, 100),
      type,
      scopeInfo,
      timelineInfo,
    };
  }, [projectType, scope, timeline]);

  if (!isOpen) return null;

  const emailValid = /\S+@\S+\.\S+/.test(email);
  const canProceed = [
    !!projectType,
    !!scope,
    !!timeline,
    name.trim().length > 0 && emailValid,
  ];

  const mailtoHref = estimate
    ? `mailto:simbi@exceed.com.sb?subject=${encodeURIComponent(
        `Quote request — ${estimate.type.label} (${initialTier} tier)`
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nCompany: ${company || "—"}\n\n` +
          `Project type: ${estimate.type.label}\nScope: ${estimate.scopeInfo.label}\nTimeline: ${estimate.timelineInfo.label}\n` +
          `Estimated range: ${formatUSD(estimate.min)} – ${formatUSD(estimate.max)}\n\n` +
          `Notes: ${notes || "—"}`
      )}`
    : undefined;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl glass rounded-3xl border border-border p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-full bg-accent/50 hover:bg-accent text-foreground/60 hover:text-foreground transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <p className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-2">
          Quote Wizard — {STEP_LABELS[step]}
        </p>
        <div className="flex gap-1.5 mb-8">
          {STEP_LABELS.map((label, idx) => (
            <div
              key={label}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                idx <= step ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>

        {step === 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-bold mb-2">What kind of project is this?</h3>
            {PROJECT_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setProjectType(type.id)}
                className={`text-left rounded-2xl border p-4 transition-all ${
                  projectType === type.id
                    ? "border-primary bg-accent/60"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <span className="font-bold text-sm">{type.label}</span>
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-bold mb-2">How large is the scope?</h3>
            {SCOPES.map((s) => (
              <button
                key={s.id}
                onClick={() => setScope(s.id)}
                className={`text-left rounded-2xl border p-4 transition-all ${
                  scope === s.id ? "border-primary bg-accent/60" : "border-border hover:border-primary/50"
                }`}
              >
                <span className="font-bold text-sm block mb-1">{s.label}</span>
                <span className="text-xs text-foreground/60">{s.desc}</span>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-bold mb-2">What&apos;s the timeline?</h3>
            {TIMELINES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTimeline(t.id)}
                className={`text-left rounded-2xl border p-4 transition-all ${
                  timeline === t.id ? "border-primary bg-accent/60" : "border-border hover:border-primary/50"
                }`}
              >
                <span className="font-bold text-sm block mb-1">{t.label}</span>
                <span className="text-xs text-foreground/60">{t.desc}</span>
              </button>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold mb-2">Who should we send this to?</h3>
            <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@company.com"
              error={email.length > 0 && !emailValid ? "Enter a valid email" : undefined}
            />
            <Input
              label="Company (optional)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company name"
            />
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">
                Project notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Anything else we should know?"
                className="bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>
          </div>
        )}

        {step === 4 && estimate && (
          <div className="flex flex-col gap-6">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-foreground/60 mb-3">
                Estimated range
              </p>
              <p className="text-4xl font-bold text-foreground mb-2">
                {formatUSD(estimate.min)} – {formatUSD(estimate.max)}
              </p>
              <p className="text-xs text-foreground/50">
                Ballpark only, based on {estimate.type.label.toLowerCase()}, {estimate.scopeInfo.label.toLowerCase()},
                {" "}{estimate.timelineInfo.label.toLowerCase()} timeline. Final pricing is confirmed after scoping with our team.
              </p>
            </div>

            <a
              href={mailtoHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-hover text-white font-bold uppercase tracking-widest text-xs py-4 transition-all"
            >
              <Check className="w-4 h-4" /> Email this quote to us
            </a>

            <div className="border-t border-border/60 pt-6 flex flex-col gap-4">
              <p className="text-xs font-bold uppercase tracking-widest text-foreground/60">
                Have questions? Reach out directly
              </p>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">Email Us</p>
                  <a href="mailto:simbi@exceed.com.sb" className="text-foreground/60 text-sm hover:text-primary transition-colors">
                    simbi@exceed.com.sb
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">Call Us</p>
                  <a href="tel:+6777421687" className="text-foreground/60 text-sm hover:text-primary transition-colors">
                    +677 7421687 | 39333
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">Visit Us</p>
                  <p className="text-foreground/60 text-sm">
                    Room 19 Level 1<br />
                    Captial Park<br />
                    Honiara, Solomon Islands
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step < 4 && (
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/60 hover:text-foreground disabled:opacity-0 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep((s) => Math.min(4, s + 1))}
              disabled={!canProceed[step]}
              className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold uppercase tracking-widest text-xs py-3 px-6 transition-all"
            >
              {step === 3 ? "See estimate" : "Next"} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
