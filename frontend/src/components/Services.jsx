import React from "react";
import {
  Scissors, Ruler, Sprout, Leaf, Sun, Layers, Trees, Droplets, ArrowUpRight, Clock,
} from "lucide-react";

const ACTIVE = [
  { icon: Scissors, title: "Lawn Mowing",  desc: "Weekly or bi-weekly mowing with sharp blades and clean cut patterns." },
  { icon: Ruler,    title: "Edging",       desc: "Crisp, defined edges along driveways, walkways and garden beds." },
  { icon: Sprout,   title: "Weed Eating",  desc: "String-trimmed perimeters that finish every yard with detail." },
];

const COMING_SOON = [
  { icon: Leaf,    title: "Leaf Cleanup" },
  { icon: Sun,     title: "Seasonal Cleanup" },
  { icon: Layers,  title: "Mulching" },
  { icon: Trees,   title: "Hedge Trimming" },
  { icon: Droplets, title: "Pressure Washing" },
];

export default function Services() {
  return (
    <section id="services" data-testid="services-section" className="relative py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl reveal">
          <div className="text-xs uppercase tracking-[0.22em] text-brand-accent font-semibold">What we do</div>
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-primary mt-3 tracking-tight">
            Services we offer today.
          </h2>
          <p className="mt-4 text-[#4A5568] text-base sm:text-lg leading-relaxed">
            We’re currently focused on three core services — done consistently, on time, and to a standard you can
            see from the street. One-time visits or recurring schedules, whichever fits your home.
          </p>
        </div>

        {/* Active services */}
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {ACTIVE.map(({ icon: Icon, title, desc }, i) => (
            <article
              key={title}
              data-testid={`service-card-${title.toLowerCase().replace(/\s+/g, "-")}`}
              className="reveal group relative rounded-2xl border border-black/[0.06] bg-white p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-[#EAF1EC] text-brand-primary flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition">
                <Icon size={22} strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 font-serif text-2xl text-brand-primary leading-tight">{title}</h3>
              <p className="mt-2 text-sm text-[#4A5568] leading-relaxed">{desc}</p>
              <a
                href="#contact"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-secondary hover:text-brand-primary transition"
                data-testid={`service-cta-${title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                Request quote <ArrowUpRight size={14} />
              </a>
            </article>
          ))}
        </div>

        {/* Coming soon strip */}
        <div className="mt-16 reveal" data-testid="services-coming-soon">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-brand-accent font-semibold">
            <Clock size={14} /> Coming soon
          </div>
          <p className="mt-3 max-w-2xl text-sm text-[#4A5568]">
            We’ll be expanding into these services as the business grows. Reach out if you’re interested — we’re
            keeping a short list.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {COMING_SOON.map(({ icon: Icon, title }) => (
              <li
                key={title}
                data-testid={`service-soon-${title.toLowerCase().replace(/\s+/g, "-")}`}
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-brand-base px-4 py-2 text-sm text-brand-primary"
              >
                <Icon size={14} className="text-brand-accent" />
                <span>{title}</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-brand-accent ml-1">Soon</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
