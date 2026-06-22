import React from "react";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import Logo from "./Logo";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#why", label: "Why Us" },
  { href: "#gallery", label: "Gallery" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="relative bg-brand-primary text-white pt-20 pb-10 overflow-hidden grain">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 text-white">
              <Logo size={40} />
              <div className="leading-tight">
                <div className="font-serif text-2xl font-semibold">Gospel Roots Lawn Care</div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-[#cbe2d0]">
                  Serving with Faith. Committed to Quality.
                </div>
              </div>
            </div>
            <p className="mt-6 text-white/75 max-w-md leading-relaxed">
              Family-run lawn care service founded by Lucas & Matthew. Honest work, dependable service, and yards
              we’re proud to stand behind.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a href="#" data-testid="footer-social-facebook" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center">
                <Facebook size={16} />
              </a>
              <a href="#" data-testid="footer-social-instagram" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="text-xs uppercase tracking-[0.22em] text-[#cbe2d0] font-semibold">Sitemap</div>
            <ul className="mt-5 grid grid-cols-2 gap-y-2.5 gap-x-6">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    data-testid={`footer-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-white/85 hover:text-white transition text-sm"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="text-xs uppercase tracking-[0.22em] text-[#cbe2d0] font-semibold">Contact</div>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href="tel:+15551234567" className="inline-flex items-center gap-2 text-white/90 hover:text-white transition">
                  <Phone size={14} /> (555) 123-4567
                </a>
              </li>
              <li>
                <a href="mailto:hello@gospelrootslawncare.com" className="inline-flex items-center gap-2 text-white/90 hover:text-white transition break-all">
                  <Mail size={14} /> hello@gospelrootslawncare.com
                </a>
              </li>
            </ul>
            <a
              href="#contact"
              data-testid="footer-cta-quote"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-brand-primary px-5 py-2.5 text-sm font-semibold hover:bg-[#F9F8F6] transition"
            >
              Get a Free Quote
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>© {new Date().getFullYear()} Gospel Roots Lawn Care. All rights reserved.</div>
          <div className="italic font-serif text-[#cbe2d0] text-sm">
            “Whatever you do, work at it with all your heart.” — Colossians 3:23
          </div>
        </div>
      </div>
    </footer>
  );
}
