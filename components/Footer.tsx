"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Globe,
  Mail,
  ArrowUpRight
} from "lucide-react";
import { Button, Card, Input } from "@/components/ui";

export default function Footer() {
  return (
    <footer className="bg-accent/30 border-t border-border pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="flex flex-col gap-6">
            <Link href="/" className="inline-block relative w-32 h-10">
              <Image
                src="/logo.png"
                alt="Exceed Logo"
                fill
                className="object-contain"
              />
            </Link>
            <p className="text-foreground/50 text-sm leading-relaxed max-w-xs">
              Empowering businesses with premium branding, bespoke fabrication, and customized software development.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Globe, href: "/" },
                { Icon: Mail, href: "mailto:simbi@exceed.com.sb" }
              ].map(({ Icon, href }, idx) => (
                <Link
                  key={idx}
                  href={href}
                  className="w-10 h-10 glass rounded-full flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/50 transition-all"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-primary">Company</h5>
            <ul className="flex flex-col gap-4 text-foreground/60 text-sm">
              {[
                { name: "About Us", href: "/about" },
                { name: "Portfolio", href: "/portfolio" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-primary transition-colors flex items-center gap-1 group">
                    {item.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-primary">Services</h5>
            <ul className="flex flex-col gap-4 text-foreground/60 text-sm">
              {["Branding & Design", "Signage & Print", "Vehicle Wraps", "Software Development"].map((item) => (
                <li key={item}>
                  <Link href="/solutions" className="hover:text-primary transition-colors flex items-center gap-1 group">
                    {item}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Card className="p-8">
            <h5 className="font-bold mb-4 text-lg">Newsletter</h5>
            <p className="text-xs text-foreground/50 mb-6">
              Get the latest updates and announcements delivered to your inbox.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="email@example.com"
                aria-label="Email address"
              />
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="w-full rounded-xl justify-center py-3"
              >
                Subscribe
              </Button>
            </form>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-border/50 gap-6">
          <p className="text-xs text-foreground/40 italic">
            &copy; {new Date().getFullYear()} Exceed Enterprise Limited. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs text-foreground/40">
            <Link href="/" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/" className="hover:text-foreground transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
