import React from "react";
import { Cross, BadgeDollarSign, Clock, Microscope, Smile, ShieldCheck } from "lucide-react";

const ITEMS = [
  { icon: Cross, title: "Faith-Based Values", desc: "Honesty, integrity, and respect guide every job we take on." },
  { icon: BadgeDollarSign, title: "Honest Pricing", desc: "Fair, transparent quotes — no hidden fees, ever." },
  { icon: Clock, title: "Reliable Service", desc: "On time, every time. We show up when we say we will." },
  { icon: Microscope, title: "Attention to Detail", desc: "Clean lines, crisp edges, and a yard that looks finished." },
  { icon: Smile, title: "Friendly Customer Service", desc: "Local, family-run, and easy to talk to." },
  { icon: ShieldCheck, title: "Satisfaction Guaranteed", desc: "If you’re not happy, we’ll make it right." },
];

export default function WhyChooseUs() {
  return (
    <section id="why" data-testid="why-section" className="relative py-24 sm:py-32 bg-brand-base">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-6 reveal">
            <div className="text-xs uppercase tracking-[0.22em] text-brand-accent font-semibold">Why choose us</div>
            <h2 className="font-serif text-4xl sm:text-5xl text-brand-primary mt-3 tracking-tight">
              A standard you can feel as soon as we pull up.
            </h2>
          </div>
          <p className="lg:col-span-6 reveal text-[#4A5568] text-base sm:text-lg leading-relaxed" style={{ transitionDelay: "120ms" }}>
            Choosing a lawn care company shouldn’t feel like a gamble. We built Gospel Roots to be the team you can
            trust on your property, around your family, and with your home’s curb appeal.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ITEMS.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              data-testid={`why-item-${title.toLowerCase().replace(/\s+/g, "-")}`}
              className="reveal rounded-2xl bg-white border border-black/5 p-7 shadow-sm hover:shadow-md transition"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="w-11 h-11 rounded-xl bg-[#EFE8DA] text-brand-accent flex items-center justify-center">
                <Icon size={20} strokeWidth={1.75} />
              </div>
              <h3 className="font-serif text-2xl text-brand-primary mt-5">{title}</h3>
              <p className="text-sm text-[#4A5568] mt-2 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
