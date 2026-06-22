import React from "react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "./ui/accordion";

const FAQS = [
  {
    q: "What does the $30 All-in-One Yard Care include?",
    a: "Every visit includes mowing, edging, and weed eating — and we blow off the driveway and walkways before we leave. That’s the whole job, one flat rate.",
  },
  {
    q: "Why one flat $30 rate?",
    a: "Honest, simple pricing is part of how we want to run this business. $30 covers an average residential yard in Gilmer. If your lot is significantly larger, we’ll let you know during the free estimate — no surprise charges after the fact.",
  },
  {
    q: "Where do you service?",
    a: "We currently service Gilmer, TX. If you’re just outside the city limits, reach out — we may still be able to help and we’ll let you know quickly if it’s a good fit.",
  },
  {
    q: "Do you offer weekly or one-time service?",
    a: "Both. You can pick weekly, bi-weekly, or a one-time visit — same flat rate either way. Most customers go bi-weekly during the growing season and weekly through peak summer.",
  },
  {
    q: "How fast can you give me a quote?",
    a: "Free estimate within 24 hours — usually much sooner. You’ll hear directly from Lucas or Matthew.",
  },
  {
    q: "Are you insured?",
    a: "Yes. We carry liability coverage and treat every property like it’s our own. If something ever isn’t right, we make it right.",
  },
  {
    q: "How do I pay?",
    a: "We’ll go over payment options when we confirm your first visit. We keep it simple and flexible — most customers pay per visit or set up a regular schedule.",
  },
  {
    q: "What does “Rooted in Faith” mean for your business?",
    a: "It means we’re committed to honest work, integrity, and treating every customer with kindness and respect. Our faith shapes how we serve — quietly, through quality and character.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" data-testid="faq-section" className="relative py-24 sm:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="reveal max-w-3xl">
          <div className="text-xs uppercase tracking-[0.22em] text-brand-accent font-semibold">FAQ</div>
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-primary mt-3 tracking-tight">
            Questions, answered.
          </h2>
          <p className="mt-4 text-[#4A5568] text-base sm:text-lg">
            Don’t see what you’re looking for? Reach out and we’ll get back quickly.
          </p>
        </div>

        <div className="reveal mt-10" style={{ transitionDelay: "120ms" }}>
          <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
            {FAQS.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`item-${i}`}
                data-testid={`faq-item-${i + 1}`}
                className="border-b border-black/10"
              >
                <AccordionTrigger className="text-left font-serif text-xl text-brand-primary hover:no-underline py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#4A5568] text-base leading-relaxed pb-6">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
