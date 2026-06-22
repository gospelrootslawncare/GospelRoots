import React from "react";
import { Scissors, Ruler, Sprout, CheckCircle2, ArrowUpRight } from "lucide-react";

const INCLUDED = [
  { icon: Scissors, label: "Lawn Mowing" },
  { icon: Ruler,    label: "Edging" },
  { icon: Sprout,   label: "Weed Eating" },
];

export default function Services() {
  return (
    <section id="services" data-testid="services-section" className="relative py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 reveal">
            <div className="text-xs uppercase tracking-[0.22em] text-brand-accent font-semibold">What we do</div>
            <h2 className="font-serif text-4xl sm:text-5xl text-brand-primary mt-3 tracking-tight">
              One plan. Everything your yard needs.
            </h2>
            <p className="mt-5 text-[#4A5568] text-base sm:text-lg leading-relaxed">
              We keep it simple. One flat-rate visit covers the work that makes a yard look finished — every time.
              Schedule weekly, bi-weekly, or as a one-time service.
            </p>
            <a
              href="#contact"
              data-testid="services-cta"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-primary text-white px-6 py-3 text-sm font-semibold hover:bg-brand-secondary transition shadow-sm"
            >
              Book a visit <ArrowUpRight size={14} />
            </a>
          </div>

          <article
            data-testid="service-card-all-in-one-yard-care"
            className="lg:col-span-7 reveal relative rounded-3xl border border-brand-primary/15 bg-brand-base p-8 sm:p-10 shadow-xl"
            style={{ transitionDelay: "120ms" }}
          >
            <div className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full bg-brand-accent text-white px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-bold">
              Our service
            </div>
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div>
                <h3 className="font-serif text-3xl sm:text-4xl text-brand-primary leading-tight">
                  All-in-One Yard Care
                </h3>
                <p className="mt-2 text-sm text-[#4A5568]">Mowing · Edging · Weed Eating — every visit, in one trip.</p>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-[0.18em] text-brand-accent font-semibold">Starting at</div>
                <div
                  data-testid="service-price"
                  className="font-serif text-5xl text-brand-primary leading-none mt-1"
                >
                  $30
                </div>
                <div className="text-xs text-[#4A5568] mt-1">per visit</div>
              </div>
            </div>

            <div className="mt-7 grid sm:grid-cols-3 gap-3">
              {INCLUDED.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  data-testid={`service-includes-${label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex items-center gap-3 rounded-2xl bg-white border border-black/[0.05] px-4 py-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#EAF1EC] text-brand-primary flex items-center justify-center">
                    <Icon size={16} strokeWidth={1.8} />
                  </div>
                  <div className="font-serif text-base text-brand-primary">{label}</div>
                </div>
              ))}
            </div>

            <ul className="mt-7 grid sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-[#1B4332]">
              {[
                "Sharp-blade mowing with clean cut patterns",
                "Crisp edges along walks, drives & beds",
                "String-trimmed perimeters and tight corners",
                "Cleanup before we leave — driveways blown clean",
                "Weekly, bi-weekly, or one-time visits",
                "Honest pricing — no surprise fees",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-brand-secondary mt-0.5 flex-shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-xs text-[#4A5568]">
              Pricing starts at $30 per visit for an average residential yard. Larger lots may vary — we’ll confirm
              with a quick look or call before the first visit.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
