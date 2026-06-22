import React from "react";
import { Cross, Heart } from "lucide-react";

const FOUNDERS = [
  {
    initials: "L",
    name: "Lucas",
    role: "Co-Founder · Lead Caretaker",
    bio:
      "Grew up around East Texas yards and learned early that the small details — straight lines, clean edges, a tidy driveway after the job — are what make a lawn feel cared for. Focused on quality and consistency on every visit.",
  },
  {
    initials: "M",
    name: "Matthew",
    role: "Co-Founder · Operations",
    bio:
      "Runs scheduling, customer communication, and equipment upkeep so jobs stay on time and well-prepared. Believes a friendly conversation and a clear quote should come standard with every estimate.",
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
            <Heart size={14} /> Meet the team
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
              data-testid={`team-member-${f.name.toLowerCase()}`}
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
                <p className="mt-4 text-[#3a4452] leading-relaxed text-sm">{f.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
