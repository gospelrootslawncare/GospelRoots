import React from "react";
import { MapPin } from "lucide-react";

const AREAS = [
  "Gilmer", "Big Sandy", "Gladewater", "Longview", "Diana",
  "Pittsburg", "Ore City", "Hawkins", "White Oak", "Mineola",
  "Hallsville", "Lone Star",
];

export default function AreasServed() {
  return (
    <section
      id="areas"
      data-testid="areas-section"
      className="relative py-20 sm:py-24 bg-white border-t border-black/[0.04]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-5 reveal">
            <div className="text-xs uppercase tracking-[0.22em] text-brand-accent font-semibold inline-flex items-center gap-2">
              <MapPin size={14} /> Areas we serve
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-brand-primary mt-3 tracking-tight">
              Proudly serving Gilmer &amp; East Texas.
            </h2>
            <p className="mt-4 text-[#4A5568] text-base leading-relaxed">
              Based in Gilmer, TX. We travel to the surrounding towns below and a little further for the right fit —
              just ask if you don’t see your area listed.
            </p>
          </div>
          <ul
            className="lg:col-span-7 reveal grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
            data-testid="areas-list"
            style={{ transitionDelay: "120ms" }}
          >
            {AREAS.map((a) => (
              <li
                key={a}
                data-testid={`area-${a.toLowerCase().replace(/\s+/g, "-")}`}
                className="rounded-2xl border border-black/[0.06] bg-brand-base px-4 py-3 text-sm font-medium text-brand-primary hover:bg-white hover:shadow-md transition"
              >
                <span className="text-brand-accent mr-1.5">•</span> {a}, TX
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
