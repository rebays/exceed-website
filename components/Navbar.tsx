"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ContactModal from "./ContactModal";

export default function Navbar() {
  const [isPastHero, setIsPastHero] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const navItems = [
    { name: "Portfolio", href: "/portfolio" },
    { name: "Solutions", href: "/solutions" },
    { name: "About", href: "/about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsPastHero(window.scrollY >= 40);
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isPastHero ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-primary to-secondary transition-[width] duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="container mx-auto px-6 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Exceed Enterprise Limited"
            width={4961}
            height={1418}
            priority
            className="h-9 w-auto md:h-10"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-bold uppercase tracking-widest text-foreground/70 hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="text-sm font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors"
          >
            Contact
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-background border-t border-border overflow-hidden transition-all duration-300 ease-out ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-t-0"
        }`}
      >
        <div className="p-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-lg font-bold uppercase tracking-widest py-2 border-b border-border/50 text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsContactModalOpen(true);
            }}
            className="text-lg font-bold uppercase tracking-widest py-2 text-primary text-left"
          >
            Contact
          </button>
        </div>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </nav>
  );
}
