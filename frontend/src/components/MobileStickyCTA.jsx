import React from "react";
import { Phone, ArrowUp } from "lucide-react";

/**
 * Mobile-only floating "Get a Quote" + phone CTA, anchored bottom of viewport.
 * Hidden on screens >= md.
 */
export default function MobileStickyCTA() {
  return (
    <div
      data-testid="mobile-sticky-cta"
      className="lg:hidden fixed bottom-4 inset-x-4 z-40"
    >
      <div className="flex items-stretch gap-2 rounded-full bg-white shadow-2xl border border-black/10 p-1.5">
        <a
          href="#contact"
          data-testid="mobile-sticky-quote"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary text-white px-4 py-3 text-sm font-semibold"
        >
          <ArrowUp size={14} /> Get a Free Quote
        </a>
        <a
          href="tel:+19034245931"
          aria-label="Call Gospel Roots Lawn Care"
          data-testid="mobile-sticky-call"
          className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-accent text-white"
        >
          <Phone size={18} />
        </a>
      </div>
    </div>
  );
}
