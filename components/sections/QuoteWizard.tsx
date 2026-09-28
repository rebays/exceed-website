"use client";

import { ReactNode, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { ContactDetails } from "@/components/ContactModal";
import { Button, Input, Modal, buttonVariants, fieldClasses } from "@/components/ui";
import { contact } from "@/lib/content";

interface QuoteWizardProps {
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

function Option({
  selected,
  onClick,
  label,
  desc,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  desc?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex items-center justify-between gap-4 text-left rounded-2xl border px-5 py-4 transition-colors ${
        selected ? "border-primary bg-primary/10" : "border-border bg-white/[0.03] hover:border-white/25"
      }`}
    >
      <span>
        <span className="block font-medium text-foreground">{label}</span>
        {desc && <span className="block mt-0.5 text-sm text-muted-foreground">{desc}</span>}
      </span>
      <span
        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
          selected ? "border-primary bg-primary text-black" : "border-white/25"
        }`}
      >
        {selected && <Check className="w-3 h-3" strokeWidth={3} />}
      </span>
    </button>
  );
}

function Step({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-2xl text-foreground mb-3">{title}</h3>
      {children}
    </div>
  );
}

export function QuoteWizard({ onClose, initialTier }: QuoteWizardProps) {
  const [step, setStep] = useState(0);
  const [projectType, setProjectType] = useState<string | null>(null);
  const [scope, setScope] = useState<string>(TIER_SCOPE[initialTier] ?? "single");
  const [timeline, setTimeline] = useState<string>("standard");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");

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

  const emailValid = /\S+@\S+\.\S+/.test(email);
  const canProceed = [!!projectType, !!scope, !!timeline, name.trim().length > 0 && emailValid];

  const mailtoHref = estimate
    ? `mailto:${contact.email}?subject=${encodeURIComponent(
        `Quote request — ${estimate.type.label} (${initialTier} tier)`
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nCompany: ${company || "—"}\n\n` +
          `Project type: ${estimate.type.label}\nScope: ${estimate.scopeInfo.label}\nTimeline: ${estimate.timelineInfo.label}\n` +
          `Estimated range: ${formatUSD(estimate.min)} – ${formatUSD(estimate.max)}\n\n` +
          `Notes: ${notes || "—"}`
      )}`
    : undefined;

  return (
    <Modal isOpen onClose={onClose} label="Quote wizard" className="max-w-xl">
      <p className="eyebrow mb-3">
        {initialTier} · Step {step + 1} of {STEP_LABELS.length}
      </p>
      <div className="flex gap-1.5 mb-10 pr-10">
        {STEP_LABELS.map((label, idx) => (
          <div
            key={label}
            className={`h-1 flex-1 rounded-full transition-colors duration-500 ${idx <= step ? "bg-primary" : "bg-white/10"}`}
          />
        ))}
      </div>

      {step === 0 && (
        <Step title="What kind of project is this?">
          {PROJECT_TYPES.map((type) => (
            <Option key={type.id} label={type.label} selected={projectType === type.id} onClick={() => setProjectType(type.id)} />
          ))}
        </Step>
      )}

      {step === 1 && (
        <Step title="How large is the scope?">
          {SCOPES.map((s) => (
            <Option key={s.id} label={s.label} desc={s.desc} selected={scope === s.id} onClick={() => setScope(s.id)} />
          ))}
        </Step>
      )}

      {step === 2 && (
        <Step title="What's the timeline?">
          {TIMELINES.map((t) => (
            <Option key={t.id} label={t.label} desc={t.desc} selected={timeline === t.id} onClick={() => setTimeline(t.id)} />
          ))}
        </Step>
      )}

      {step === 3 && (
        <Step title="Who should we send this to?">
          <div className="flex flex-col gap-4">
            <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" autoComplete="name" />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@company.com"
              autoComplete="email"
              error={email.length > 0 && !emailValid ? "Enter a valid email" : undefined}
            />
            <Input
              label="Company (optional)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company name"
              autoComplete="organization"
            />
            <div className="flex flex-col gap-2">
              <label htmlFor="quote-notes" className="text-sm text-muted-foreground">
                Project notes (optional)
              </label>
              <textarea
                id="quote-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Anything else we should know?"
                className={`${fieldClasses} resize-none`}
              />
            </div>
          </div>
        </Step>
      )}

      {step === 4 && estimate && (
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">Estimated range</p>
            <p className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-metal">
              {formatUSD(estimate.min)} – {formatUSD(estimate.max)}
            </p>
            <p className="mt-4 text-sm text-subtle-foreground">
              Ballpark only, based on {estimate.type.label.toLowerCase()}, {estimate.scopeInfo.label.toLowerCase()},{" "}
              {estimate.timelineInfo.label.toLowerCase()} timeline. Final pricing is confirmed after scoping with our team.
            </p>
          </div>

          <a href={mailtoHref} className={buttonVariants({ size: "lg", className: "w-full" })}>
            <Check className="w-4 h-4" /> Email this quote to us
          </a>

          <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground mt-2">Questions? Reach out directly.</p>
            <ContactDetails />
          </div>
        </div>
      )}

      {step < 4 && (
        <div className="flex items-center justify-between mt-10">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground disabled:invisible transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <Button onClick={() => setStep((s) => Math.min(4, s + 1))} disabled={!canProceed[step]}>
            {step === 3 ? "See estimate" : "Continue"} <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </Modal>
  );
}
