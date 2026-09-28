"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { Modal } from "@/components/ui";
import { contact } from "@/lib/content";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactDetails() {
  const rows = [
    { Icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { Icon: Phone, label: "Call", value: contact.phoneDisplay, href: contact.phoneHref },
    { Icon: MapPin, label: "Visit", value: contact.address.join(", ") },
  ];

  return (
    <ul className="flex flex-col divide-y divide-border">
      {rows.map(({ Icon, label, value, href }) => (
        <li key={label} className="flex items-center gap-4 py-4">
          <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 text-primary" />
          </span>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">{label}</p>
            {href ? (
              <a href={href} className="text-foreground hover:text-primary transition-colors break-words">
                {value}
              </a>
            ) : (
              <p className="text-foreground">{value}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} label="Contact Exceed">
      <h2 className="text-3xl text-foreground mb-2">Get in touch.</h2>
      <p className="text-muted-foreground mb-6">Tell us what you&apos;re building.</p>
      <ContactDetails />
    </Modal>
  );
}
