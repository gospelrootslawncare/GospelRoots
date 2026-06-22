import React from "react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "./ui/accordion";

const FAQS = [
  {
    q: "What areas do you serve?",
    a: "We serve homeowners in our local community. Reach out with your address and we’ll confirm if you’re inside our service zone — we’re happy to drive a little further for the right fit.",
  },
  {
    q: "Do you offer one-time services or only recurring?",
    a: "Both! We provide weekly and bi-weekly maintenance plans, as well as one-time visits for seasonal cleanups, mulching, and special projects.",
  },
  {
    q: "How much does service cost?",
    a: "Pricing depends on the size of your yard, the services needed, and frequency. We provide honest, upfront quotes after a quick look — no hidden fees, ever.",
  },
  {
    q: "Are you insured?",
    a: "Yes. We carry liability coverage and treat every property like it’s our own. If something ever isn’t right, we make it right.",
  },
  {
    q: "How do I get started?",
    a: "Fill out the quote form below or give us a call. We’ll respond promptly to schedule a quick visit or phone consultation.",
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
