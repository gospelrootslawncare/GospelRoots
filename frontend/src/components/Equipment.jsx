import React from "react";
import { Wrench, Truck, Fuel, Sparkles, Cog } from "lucide-react";

const ITEMS = [
  { icon: Wrench,   title: "Commercial-grade mowers",        desc: "Sharp blades, balanced decks, kept maintained for clean, consistent cuts." },
  { icon: Cog,      title: "String trimmers & edgers",       desc: "Pro-level trimmers for tight corners and bed lines that read straight from the street." },
  { icon: Truck,    title: "Truck-loaded & ready",           desc: "Everything we need fits in the truck — no trailer, no slow setup, no extra footprint on your property." },
  { icon: Fuel,     title: "Spare fuel & supplies",          desc: "We don’t have to leave your property to get the job done right." },
  { icon: Sparkles, title: "Blower for cleanup",             desc: "Driveways, walkways and porches blown clean before we leave — no clippings left behind." },
];

export default function Equipment() {
  return (
    <section
      id="equipment"
      data-testid="equipment-section"
      className="relative py-20 sm:py-24 bg-brand-base border-t border-black/[0.04]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl reveal">
          <div className="text-xs uppercase tracking-[0.22em] text-brand-accent font-semibold inline-flex items-center gap-2">
            <Wrench size={14} /> The tools we use
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-primary mt-3 tracking-tight">
            Set up right. Maintained right.
          </h2>
          <p className="mt-4 text-[#4A5568] text-base leading-relaxed">
            Good equipment doesn’t cut corners — it lets us finish faster, leave less mess, and treat your lawn
            with the respect it deserves.
          </p>
        </div>

        <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" data-testid="equipment-list">
          {ITEMS.map(({ icon: Icon, title, desc }, i) => (
            <li
              key={title}
              data-testid={`equipment-item-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="reveal rounded-2xl bg-white border border-black/[0.05] p-6 shadow-sm hover:shadow-md transition"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="w-10 h-10 rounded-xl bg-[#EFE8DA] text-brand-accent flex items-center justify-center">
                <Icon size={18} strokeWidth={1.75} />
              </div>
              <h3 className="font-serif text-lg text-brand-primary mt-4 leading-tight">{title}</h3>
              <p className="text-sm text-[#4A5568] mt-1.5 leading-relaxed">{desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
