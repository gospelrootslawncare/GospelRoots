import React from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Calendar } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SeasonalBanner from "../components/SeasonalBanner";
import MobileStickyCTA from "../components/MobileStickyCTA";
import useScrollReveal from "../hooks/useScrollReveal";

const INCLUDED = [
  "Sharp-blade mowing with clean cut patterns",
  "Crisp edges along walks, drives & beds",
  "String-trimmed perimeters and corners",
  "Driveways and walkways blown clean before we leave",
  "Friendly, on-time service from Lucas & Matthew",
  "Honest pricing — no hidden fees",
];

const FREQUENCIES = [
  {
    key: "weekly",
    title: "Weekly",
    sub: "Best for fast-growing summer lawns.",
    note: "Recommended April – September",
  },
  {
    key: "biweekly",
    title: "Bi-Weekly",
    sub: "Our most popular schedule.",
    note: "Recommended spring + fall",
    popular: true,
  },
  {
    key: "onetime",
    title: "One-Time Visit",
    sub: "Just need it knocked back?",
    note: "We’ll get it cleaned up in one trip",
  },
];

export default function Plans() {
  useScrollReveal();
  return (
    <div data-testid="plans-page">
      <SeasonalBanner />
      <Navbar />
      <main className="bg-brand-base">
        <section className="pt-32 sm:pt-40 pb-12 bg-white border-b border-black/[0.04]">
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <div className="text-xs uppercase tracking-[0.22em] text-brand-accent font-semibold reveal">Plans &amp; pricing</div>
            <h1 className="font-serif text-5xl sm:text-6xl text-brand-primary mt-3 tracking-tight reveal" style={{ transitionDelay: "80ms" }}>
              One simple plan.
            </h1>
            <p className="mt-5 max-w-2xl text-[#4A5568] text-base sm:text-lg leading-relaxed reveal" style={{ transitionDelay: "160ms" }}>
              We keep things simple. One flat rate covers everything your yard needs each visit. Pick how often you
              want us out — it’s the same great service every time.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            {/* Main plan card */}
            <div
              data-testid="plan-card-main"
              className="reveal relative rounded-3xl bg-white border border-brand-primary/15 shadow-xl p-8 sm:p-12"
            >
              <div className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full bg-brand-accent text-white px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-bold">
                Available now
              </div>
              <div className="grid lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7">
                  <h2 className="font-serif text-4xl sm:text-5xl text-brand-primary tracking-tight leading-tight">
                    All-in-One Yard Care
                  </h2>
                  <p className="mt-3 text-[#4A5568] text-base sm:text-lg">
                    Mowing, edging, and weed eating — every visit, every yard, done in one trip.
                  </p>

                  <ul className="mt-7 grid sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-[#1B4332]">
                    {INCLUDED.map((t) => (
                      <li key={t} className="flex items-start gap-2">
                        <Check size={16} className="text-brand-secondary mt-0.5 flex-shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-5">
                  <div className="rounded-2xl bg-brand-base border border-black/[0.05] p-7 text-center">
                    <div className="text-xs uppercase tracking-[0.18em] text-brand-accent font-semibold">Starting at</div>
                    <div data-testid="plan-price" className="font-serif text-7xl text-brand-primary mt-2 leading-none">
                      $30
                    </div>
                    <div className="text-sm text-[#4A5568] mt-1">per visit</div>

                    <Link
                      to="/#contact"
                      data-testid="plan-cta"
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary text-white px-6 py-3 text-sm font-semibold hover:bg-brand-secondary transition shadow-sm"
                    >
                      Book a visit <ArrowRight size={14} />
                    </Link>
                    <p className="mt-3 text-xs text-[#4A5568]">
                      Free estimate within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Frequency options */}
            <div className="mt-14">
              <div className="text-xs uppercase tracking-[0.22em] text-brand-accent font-semibold inline-flex items-center gap-2 reveal">
                <Calendar size={14} /> Choose how often
              </div>
              <div className="mt-5 grid md:grid-cols-3 gap-5">
                {FREQUENCIES.map((f, i) => (
                  <div
                    key={f.key}
                    data-testid={`plan-frequency-${f.key}`}
                    className="reveal relative rounded-2xl bg-white border border-black/[0.05] p-6 shadow-sm"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    {f.popular && (
                      <div className="absolute -top-2.5 right-4 inline-flex items-center gap-1 rounded-full bg-brand-primary text-white px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] font-bold">
                        Most popular
                      </div>
                    )}
                    <div className="font-serif text-2xl text-brand-primary leading-tight">{f.title}</div>
                    <div className="text-sm text-[#4A5568] mt-1">{f.sub}</div>
                    <div className="text-xs text-brand-accent uppercase tracking-[0.16em] font-semibold mt-4">{f.note}</div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-[#4A5568] max-w-2xl">
                Pricing starts at $30 per visit for an average residential yard. Larger lots may vary slightly —
                we’ll confirm before the first visit.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
