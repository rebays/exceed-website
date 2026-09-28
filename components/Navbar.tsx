"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ContactButton from "./ContactButton";
import { buttonVariants } from "@/components/ui";
import { navItems } from "@/lib/content";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  // Close the mobile menu whenever the route changes.
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid
            ? "bg-black/70 backdrop-blur-xl backdrop-saturate-150 border-b border-border"
            : "border-b border-transparent"
        }`}
      >
        <nav
          className="mx-auto max-w-[1200px] px-6 h-14 flex items-center justify-between"
          aria-label="Main"
        >
          <Link
            href="/"
            className="flex items-center shrink-0"
            aria-label="Exceed home"
          >
            <Image
              src="/logo.png"
              alt="Exceed Enterprise Limited"
              width={84}
              height={24}
              priority
              className="h-6 w-auto"
            />
          </Link>

          <ul className="hidden md:flex items-center gap-10">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`text-[13px] tracking-wide transition-colors ${
                      active
                        ? "text-foreground"
                        : "text-foreground/65 hover:text-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <ContactButton className={buttonVariants({ variant: "secondary", size: "sm" })}>Contact</ContactButton>
              <Link href="/#pricing" className={buttonVariants({ size: "sm" })}>
                Get a quote
              </Link>
            </div>
            <button
              className="md:hidden -mr-2 p-2 text-foreground"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu — full-screen, Apple-style */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-x-0 top-14 bottom-0 z-40 bg-black/95 backdrop-blur-xl transition-opacity duration-500 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        inert={!menuOpen}
      >
        <ul className="px-8 pt-10 flex flex-col gap-2">
          {[{ name: "Home", href: "/" }, ...navItems].map((item, idx) => (
            <li
              key={item.href}
              className="transition-all duration-500 ease-out-expo"
              style={{
                transitionDelay: menuOpen ? `${idx * 50 + 100}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "none" : "translateY(-8px)",
              }}
            >
              <Link
                href={item.href}
                className="block py-2 text-3xl font-semibold tracking-tight text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-8 mt-10 flex flex-col gap-3">
          <Link
            href="/#pricing"
            className={buttonVariants({ size: "lg", className: "w-full" })}
            onClick={() => setMenuOpen(false)}
          >
            Get a quote
          </Link>
          <ContactButton
            className={buttonVariants({ variant: "secondary", size: "lg", className: "w-full" })}
          >
            Contact us
          </ContactButton>
        </div>
      </div>
    </>
  );
}
