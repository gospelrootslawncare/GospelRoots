import React from "react";
import { MapPin } from "lucide-react";

export default function AreasServed() {
  return (
    <section
      id="areas"
      data-testid="areas-section"
      className="relative py-20 sm:py-24 bg-white border-t border-black/[0.04]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 reveal">
            <div className="text-xs uppercase tracking-[0.22em] text-brand-accent font-semibold inline-flex items-center gap-2">
              <MapPin size={14} /> Areas we serve
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-brand-primary mt-3 tracking-tight">
              Proudly serving Gilmer, TX.
            </h2>
            <p className="mt-4 text-[#4A5568] text-base leading-relaxed">
              We’re currently focused on doing right by our neighbors in Gilmer. If you’re just outside the city
              limits, reach out — we may still be able to help, and we’ll let you know if it’s a good fit.
            </p>
            <p className="mt-3 text-sm text-[#4A5568]">
              <span className="text-brand-accent font-semibold">Expanding soon</span> to surrounding East Texas towns.
            </p>
          </div>

          <div className="lg:col-span-6 reveal" style={{ transitionDelay: "120ms" }}>
            <div
              className="rounded-3xl bg-brand-base border border-black/[0.06] p-8 sm:p-10 flex items-center gap-5"
              data-testid="areas-list"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-primary text-white flex items-center justify-center flex-shrink-0">
                <MapPin size={28} />
              </div>
              <div>
                <div
                  data-testid="area-gilmer"
                  className="font-serif text-3xl sm:text-4xl text-brand-primary leading-tight"
                >
                  Gilmer, TX
                </div>
                <div className="text-sm text-[#4A5568] mt-1.5">Upshur County · East Texas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
