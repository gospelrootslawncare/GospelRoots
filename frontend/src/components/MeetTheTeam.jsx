import React from "react";
import { Cross, Heart } from "lucide-react";

const FOUNDERS = [
  {
    initials: "L",
    name: "Lucas Robins",
    role: "Co-Founder",
    bio:
      "Lucas Robins is a co-founder of Gospel Roots Lawn Care. His faith in Jesus Christ shapes the way he approaches both life and business. Having traveled to South Korea, the Marshall Islands, and several states across the United States, he has developed an appreciation for serving people from many different backgrounds with kindness and respect.\n\nLucas is committed to providing dependable, high-quality lawn care with honesty, integrity, and attention to detail. He believes every job is an opportunity to serve others well and to honor God through excellence and hard work.",
  },
  {
    initials: "M",
    name: "Matthew",
    role: "Co-Founder",
    bio:
      "Matthew is a co-founder of Gospel Roots Lawn Care. Raised in East Texas, he grew up mowing lawns and developed a strong work ethic from an early age. His years of hands-on experience have taught him the importance of reliability, quality, and taking pride in every job.\n\nMatthew’s faith in Jesus Christ motivates him to serve customers with humility, honesty, and excellence. He is dedicated to treating every property as if it were his own and building lasting relationships through dependable service and genuine care for the community.",
  },
];

export default function MeetTheTeam() {
  return (
    <section
      id="team"
      data-testid="team-section"
      className="relative py-24 sm:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl reveal">
          <div className="text-xs uppercase tracking-[0.22em] text-brand-accent font-semibold inline-flex items-center gap-2">
            <Heart size={14} /> Meet the Founders
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-primary mt-3 tracking-tight">
            Lucas &amp; Matthew.
          </h2>
          <p className="mt-4 text-[#4A5568] text-base sm:text-lg leading-relaxed">
            Local, family-run, and easy to talk to. When you call Gospel Roots, you’re talking to the same two
            people who will be on your lawn — not a call center.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {FOUNDERS.map((f, i) => (
            <article
              key={f.name}
              data-testid={`team-member-${f.name.split(' ')[0].toLowerCase()}`}
              className="reveal rounded-3xl bg-brand-base border border-black/[0.05] p-7 sm:p-9 flex items-start gap-6 shadow-sm"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Initial avatar (no photos) */}
              <div
                aria-hidden
                className="w-20 h-20 rounded-2xl bg-brand-primary text-white flex items-center justify-center flex-shrink-0 shadow-md relative"
              >
                <span className="font-serif text-4xl leading-none">{f.initials}</span>
                <Cross
                  size={12}
                  className="absolute -top-1.5 -right-1.5 text-brand-accent bg-white rounded-full p-0.5"
                />
              </div>
              <div className="min-w-0">
                <div className="font-serif text-2xl text-brand-primary leading-tight">{f.name}</div>
                <div className="text-xs uppercase tracking-[0.18em] text-brand-accent font-semibold mt-1">
                  {f.role}
                </div>
                <p className="mt-4 text-[#3a4452] leading-relaxed text-sm whitespace-pre-line">{f.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
