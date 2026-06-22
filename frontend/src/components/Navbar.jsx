import React, { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import Logo from "./Logo";

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#why", label: "Why Us" },
  { href: "#gallery", label: "Gallery" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header
      data-testid="site-navbar"
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-[#F9F8F6]/80 border-b border-black/5"
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        <a
          href="#home"
          data-testid="nav-logo"
          className="flex items-center gap-3 text-brand-primary hover:opacity-90 transition"
        >
          <Logo size={34} />
          <div className="leading-tight">
            <div className="font-serif text-lg sm:text-xl text-brand-primary font-semibold tracking-tight">
              Gospel Roots
            </div>
            <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-brand-accent font-semibold">
              Lawn Care
            </div>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              data-testid={`nav-link-${n.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="px-3 py-2 text-sm text-[#2a2a2a] hover:text-brand-primary transition font-medium"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#contact"
            data-testid="nav-cta-quote"
            className="ml-3 inline-flex items-center gap-2 rounded-full bg-brand-primary text-white px-5 py-2.5 text-sm font-semibold hover:bg-brand-secondary transition shadow-sm"
          >
            <Phone size={16} /> Free Quote
          </a>
        </div>

        <button
          data-testid="nav-toggle-mobile"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-black/10 text-brand-primary"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div
          data-testid="nav-mobile-panel"
          className="lg:hidden border-t border-black/5 bg-[#F9F8F6]"
        >
          <div className="px-5 py-4 flex flex-col gap-1">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={close}
                data-testid={`nav-mobile-link-${n.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="py-2 text-base text-[#2a2a2a] hover:text-brand-primary"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={close}
              data-testid="nav-mobile-cta-quote"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary text-white px-5 py-3 text-sm font-semibold"
            >
              <Phone size={16} /> Get a Free Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
