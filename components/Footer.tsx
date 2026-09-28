import Link from "next/link";
import Image from "next/image";
import { contact, navItems, services } from "@/lib/content";

export default function Footer() {
  return (
    // No background of its own: it shares the page black and the glow from the section above.
    <footer className="relative text-sm">
      <div className="mx-auto max-w-[1200px] px-6 pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pb-16">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
            <Link href="/" aria-label="Exceed home">
              <Image src="/logo.png" alt="Exceed Enterprise Limited" width={98} height={28} className="h-7 w-auto" />
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-xs">
              Branding, signage and custom software from Honiara, Solomon Islands.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-medium text-foreground mb-5">Explore</h2>
            <ul className="flex flex-col gap-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-medium text-foreground mb-5">Services</h2>
            <ul className="flex flex-col gap-3">
              {services.slice(0, 4).map((service) => (
                <li key={service.title}>
                  <Link href="/solutions" className="text-muted-foreground hover:text-foreground transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h2 className="text-xs font-medium text-foreground mb-5">Contact</h2>
            <ul className="flex flex-col gap-3 text-muted-foreground">
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-foreground transition-colors">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={contact.phoneHref} className="hover:text-foreground transition-colors">
                  {contact.phoneDisplay}
                </a>
              </li>
              <li className="leading-relaxed">
                {contact.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-subtle-foreground">
          <p>&copy; {new Date().getFullYear()} Exceed Enterprise Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
