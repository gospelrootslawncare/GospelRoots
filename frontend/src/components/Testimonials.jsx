import React from "react";
import { Quote, Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Sarah M.",
    role: "Homeowner",
    body: "Lucas and Matthew are dependable, kind, and the yard looks better than ever. Edges so clean it almost feels rude to walk on the lawn!",
  },
  {
    name: "David R.",
    role: "Homeowner",
    body: "Honest pricing, on time every visit, and they take real pride in their work. Highly recommend Gospel Roots to anyone on our street.",
  },
  {
    name: "The Hendersons",
    role: "Weekly Service",
    body: "We switched after one estimate. They’re respectful young men and you can tell they actually care. Our lawn has never looked better.",
  },
  {
    name: "Beth K.",
    role: "Seasonal Cleanup",
    body: "Spring cleanup transformed our yard. They hauled everything away and left it spotless. Already booked the fall service.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" data-testid="testimonials-section" className="relative py-24 sm:py-32 bg-brand-base">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="reveal max-w-3xl">
          <div className="text-xs uppercase tracking-[0.22em] text-brand-accent font-semibold">Testimonials</div>
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-primary mt-3 tracking-tight">
            Kind words from our neighbors.
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {REVIEWS.map((r, i) => (
            <figure
              key={r.name}
              data-testid={`testimonial-${i + 1}`}
              className="reveal relative rounded-2xl bg-white border border-black/5 p-6 shadow-sm hover:shadow-md transition"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Quote className="absolute top-5 right-5 text-[#EFE8DA]" size={42} />
              <div className="flex items-center gap-1 text-brand-accent">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={14} fill="currentColor" stroke="none" />
                ))}
              </div>
              <blockquote className="mt-4 text-[#3a4452] text-sm leading-relaxed">
                “{r.body}”
              </blockquote>
              <figcaption className="mt-5 pt-4 border-t border-black/5">
                <div className="font-serif text-lg text-brand-primary">{r.name}</div>
                <div className="text-xs text-[#4A5568] uppercase tracking-[0.18em] mt-0.5">{r.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
