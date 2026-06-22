import React from "react";
import {
  Scissors, Ruler, Sprout, Leaf, Sun, Layers, Trees, Droplets, ArrowUpRight
} from "lucide-react";

const SERVICES = [
  { icon: Scissors, title: "Lawn Mowing", desc: "Weekly or bi-weekly mowing with sharp blades and clean cut patterns." },
  { icon: Ruler, title: "Edging", desc: "Crisp, defined edges along driveways, walkways and garden beds." },
  { icon: Sprout, title: "Weed Eating", desc: "String-trimmed perimeters that finish every yard with detail." },
  { icon: Leaf, title: "Leaf Cleanup", desc: "Thorough leaf removal to keep your turf healthy through the seasons." },
  { icon: Sun, title: "Seasonal Cleanup", desc: "Spring & fall reset — debris hauling, beds refreshed, lawn ready." },
  { icon: Layers, title: "Mulching", desc: "Fresh mulch installation that protects beds and boosts curb appeal." },
  { icon: Trees, title: "Hedge Trimming", desc: "Shaped, healthy hedges and shrubs — neat, balanced and tidy." },
  { icon: Droplets, title: "Pressure Washing", desc: "Driveways, patios, siding — coming soon.", soon: true },
];

export default function Services() {
  return (
    <section id="services" data-testid="services-section" className="relative py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl reveal">
          <div className="text-xs uppercase tracking-[0.22em] text-brand-accent font-semibold">What we do</div>
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-primary mt-3 tracking-tight">
            Services tailored to your yard.
          </h2>
          <p className="mt-4 text-[#4A5568] text-base sm:text-lg leading-relaxed">
            From routine mowing to seasonal resets, every service is performed with the same standard of care.
            One-time or recurring — we’ll build a plan that fits your home.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {SERVICES.map(({ icon: Icon, title, desc, soon }, i) => (
            <article
              key={title}
              data-testid={`service-card-${title.toLowerCase().replace(/\s+/g, "-")}`}
              className="reveal group relative rounded-2xl border border-black/[0.06] bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-[#EAF1EC] text-brand-primary flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition">
                <Icon size={22} strokeWidth={1.75} />
              </div>
              <div className="mt-5 flex items-start justify-between gap-2">
                <h3 className="font-serif text-2xl text-brand-primary leading-tight">{title}</h3>
                {soon && (
                  <span className="text-[10px] uppercase tracking-widest font-bold bg-[#EFE8DA] text-brand-accent rounded-full px-2 py-1 whitespace-nowrap">
                    Coming Soon
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-[#4A5568] leading-relaxed">{desc}</p>
              {!soon && (
                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-secondary hover:text-brand-primary transition"
                  data-testid={`service-cta-${title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  Request quote <ArrowUpRight size={14} />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
