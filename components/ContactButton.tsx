"use client";

import { ReactNode, useCallback, useState } from "react";
import ContactModal from "./ContactModal";

/** A button that opens the contact dialog. Drop it anywhere, including Server Components. */
export default function ContactButton({ className, children }: { className?: string; children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <button type="button" className={className} onClick={() => setIsOpen(true)}>
        {children}
      </button>
      <ContactModal isOpen={isOpen} onClose={close} />
    </>
  );
}
