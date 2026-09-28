"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  className?: string;
}

/**
 * Centered dialog with backdrop, Escape-to-close and body scroll lock.
 * Portaled to <body> so ancestors with transforms or backdrop-filter
 * (e.g. the navbar) can't trap its fixed positioning.
 */
export function Modal({ isOpen, onClose, label, children, className = "max-w-lg" }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={label}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <div
        className={`relative w-full max-h-[90vh] overflow-y-auto rounded-[28px] glass p-8 md:p-10 shadow-2xl animate-modal-in ${className}`}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
