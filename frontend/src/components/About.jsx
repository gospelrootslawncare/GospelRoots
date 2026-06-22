import React from "react";
import { Leaf, HeartHandshake } from "lucide-react";

const ABOUT_IMG =
  "https://images.pexels.com/photos/5163420/pexels-photo-5163420.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900";

export default function About() {
  return (
    <section id="about" data-testid="about-section" className="relative py-24 sm:py-32 bg-brand-base">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image block */}
          <div className="lg:col-span-5 reveal">
            <div className="relative">
              <div className="absolute -top-6 -left-6 right-10 bottom-10 bg-brand-primary rounded-[2rem]" aria-hidden />
              <img
                src={ABOUT_IMG}
                alt="Lucas and Matthew tending to a lawn"
                className="relative z-10 w-full h-[460px] object-cover rounded-[2rem] shadow-xl"
                loading="lazy"
              />
              <div className="absolute z-20 -bottom-6 -right-2 sm:right-6 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 max-w-[260px]">
                <div className="w-10 h-10 rounded-full bg-[#EFE8DA] text-brand-accent flex items-center justify-center">
                  <HeartHandshake size={20} />
                </div>
                <div className="leading-tight">
                  <div className="font-serif text-xl text-brand-primary">Lucas & Matthew</div>
                  <div className="text-xs text-[#4A5568]">Founders & Caretakers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Text block */}
          <div className="lg:col-span-7 reveal" style={{ transitionDelay: "120ms" }}>
            <div className="text-xs uppercase tracking-[0.22em] text-brand-accent font-semibold inline-flex items-center gap-2">
              <Leaf size={14} /> About Gospel Roots
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-brand-primary mt-4 tracking-tight">
              Honest work, deep roots, and yards we’re proud to stand behind.
            </h2>
            <div className="mt-6 space-y-5 text-[#3a4452] text-base sm:text-lg leading-relaxed">
              <p>
                Gospel Roots Lawn Care was founded by <strong className="text-brand-primary">Lucas and Matthew</strong>{" "}
                with a simple goal: to glorify God through honest work, integrity, and excellent service. We believe
                that taking care of someone’s lawn is a small but meaningful way to serve our neighbors.
              </p>
              <p>
                Every yard we touch is treated with care and respect — from clean edges and crisp lines to the way we
                leave the driveway when we’re done. Whether you need weekly mowing, a seasonal cleanup, or fresh mulch
                before the season changes, you can count on dependable service and a friendly conversation along the way.
              </p>
            </div>

            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {[
                { k: "Trustworthy", v: "Faith-based values guide every job." },
                { k: "Dependable", v: "Show up on time, every time." },
                { k: "Detail-driven", v: "Clean edges. Clean lines. Done right." },
              ].map((b) => (
                <div key={b.k} className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
                  <div className="font-serif text-xl text-brand-primary">{b.k}</div>
                  <p className="text-sm text-[#4A5568] mt-1 leading-relaxed">{b.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
