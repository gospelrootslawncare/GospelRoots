import React from "react";
import BeforeAfter from "./BeforeAfter";

const PAIRS = [
  {
    before: "https://images.pexels.com/photos/17933004/pexels-photo-17933004.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200",
    after: "https://images.pexels.com/photos/7546775/pexels-photo-7546775.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200",
    label: "Backyard Renewal",
  },
  {
    before: "https://images.pexels.com/photos/32528678/pexels-photo-32528678.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200",
    after: "https://images.unsplash.com/photo-1681853108586-f29b4ef5c0fb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwyfHxwZXJmZWN0JTIwbWFuaWN1cmVkJTIwbGF3biUyMGJhY2t5YXJkfGVufDB8fHx8MTc4MjA5NTYwNXww&ixlib=rb-4.1.0&q=85&w=1200",
    label: "Front Yard Refresh",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" data-testid="gallery-section" className="relative py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="reveal max-w-2xl">
            <div className="text-xs uppercase tracking-[0.22em] text-brand-accent font-semibold">Gallery</div>
            <h2 className="font-serif text-4xl sm:text-5xl text-brand-primary mt-3 tracking-tight">
              Before & after — the difference is in the details.
            </h2>
          </div>
          <p className="reveal max-w-md text-[#4A5568]" style={{ transitionDelay: "120ms" }}>
            Drag the slider on each photo to see real transformations from yards we’ve cared for.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6 lg:gap-8">
          {PAIRS.map((p, i) => (
            <div
              key={p.label}
              className="reveal"
              style={{ transitionDelay: `${i * 120}ms` }}
              data-testid={`gallery-pair-${i + 1}`}
            >
              <BeforeAfter before={p.before} after={p.after} testId={`ba-slider-${i + 1}`} />
              <div className="mt-4 flex items-center justify-between">
                <div className="font-serif text-xl text-brand-primary">{p.label}</div>
                <div className="text-xs uppercase tracking-[0.22em] text-brand-accent font-semibold">
                  Drag to compare
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
