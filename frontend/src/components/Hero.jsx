import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const HERO_BG =
  "https://images.pexels.com/photos/16630711/pexels-photo-16630711.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600";

export default function Hero() {
  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative isolate min-h-[92vh] flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={HERO_BG}
          alt="Lush green lawn at sunrise"
          className="w-full h-full object-cover kenburns"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1f17]/70 via-[#0b1f17]/40 to-[#0b1f17]/80" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-28 sm:py-36 w-full">
        <div className="max-w-3xl">
          <div className="reveal inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white px-4 py-1.5 text-xs uppercase tracking-[0.22em] font-semibold">
            <Sparkles size={14} className="text-[#d2b48c]" />
            Serving with Faith. Committed to Quality.
          </div>

          <h1
            data-testid="hero-headline"
            className="reveal font-serif text-white text-5xl sm:text-6xl lg:text-7xl leading-[1.02] mt-6 tracking-tight"
            style={{ transitionDelay: "80ms" }}
          >
            Professional Lawn Care
            <span className="block italic text-[#cbe2d0]">Rooted in Faith.</span>
          </h1>

          <p
            className="reveal mt-6 text-base sm:text-lg text-white/85 max-w-2xl leading-relaxed"
            style={{ transitionDelay: "160ms" }}
          >
            Serving homeowners with dependable lawn care, honest work, and quality you can trust.
            From weekly mowing to seasonal cleanups, we treat every yard with the care and respect it deserves.
          </p>

          <div
            className="reveal mt-8 flex flex-wrap items-center gap-3"
            style={{ transitionDelay: "240ms" }}
          >
            <a
              href="#contact"
              data-testid="hero-cta-quote"
              className="group inline-flex items-center gap-2 rounded-full bg-[#F9F8F6] text-brand-primary px-6 py-3.5 text-sm font-semibold hover:bg-white transition shadow-lg shadow-black/20"
            >
              Get a Free Quote
              <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
            </a>
            <a
              href="#services"
              data-testid="hero-cta-services"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 text-white px-6 py-3.5 text-sm font-semibold hover:bg-white/10 transition"
            >
              Our Services
            </a>
          </div>

          {/* 24-hour promise */}
          <div
            className="reveal mt-5 inline-flex items-center gap-2 text-xs sm:text-sm text-white/85"
            style={{ transitionDelay: "300ms" }}
            data-testid="hero-promise"
          >
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#cbe2d0]/20 text-[#cbe2d0]">
              ✓
            </span>
            Free estimate within <strong className="font-semibold text-white">24 hours</strong> · Gilmer, TX &amp; surrounding areas
          </div>

          {/* Trust badges */}
          <div
            className="reveal mt-12 grid grid-cols-3 max-w-lg gap-6 text-white/90"
            style={{ transitionDelay: "320ms" }}
          >
            {[
              { k: "5★", v: "Customer Rated" },
              { k: "100%", v: "Satisfaction" },
              { k: "Local", v: "Family Owned" },
            ].map((b) => (
              <div key={b.v} className="border-l border-white/20 pl-4">
                <div className="font-serif text-3xl sm:text-4xl text-white">{b.k}</div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-white/70 mt-1">
                  {b.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-b from-transparent to-[#F9F8F6]/0" />
    </section>
  );
}
