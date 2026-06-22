import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import POSTS from "../data/blogPosts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SeasonalBanner from "../components/SeasonalBanner";
import MobileStickyCTA from "../components/MobileStickyCTA";
import useScrollReveal from "../hooks/useScrollReveal";

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric", month: "long", day: "numeric",
    });
  } catch { return iso; }
}

export default function Blog() {
  useScrollReveal();
  return (
    <div data-testid="blog-page">
      <SeasonalBanner />
      <Navbar />
      <main className="bg-brand-base">
        {/* Header */}
        <section className="pt-32 pb-12 sm:pt-40 sm:pb-16 bg-white border-b border-black/[0.04]">
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <div className="text-xs uppercase tracking-[0.22em] text-brand-accent font-semibold reveal">
              Lawn Care Notebook
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl text-brand-primary mt-3 tracking-tight reveal" style={{ transitionDelay: "80ms" }}>
              Tips for East Texas homeowners.
            </h1>
            <p className="mt-5 max-w-2xl text-[#4A5568] text-base sm:text-lg leading-relaxed reveal" style={{ transitionDelay: "160ms" }}>
              Short, practical guides on caring for your lawn in Gilmer and the surrounding area — written by Lucas
              &amp; Matthew from what we see on the job each week.
            </p>
          </div>
        </section>

        {/* Posts */}
        <section className="py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-5 sm:gap-7" data-testid="blog-grid">
            {POSTS.map((p, i) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                data-testid={`blog-card-${p.slug}`}
                className="reveal group rounded-3xl bg-white border border-black/[0.05] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-3 text-xs text-[#4A5568]">
                  <span className="uppercase tracking-[0.18em] text-brand-accent font-semibold">Article</span>
                  <span>·</span>
                  <span>{formatDate(p.date)}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1"><Clock size={11} /> {p.readMinutes} min read</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-brand-primary mt-4 tracking-tight leading-tight">
                  {p.title}
                </h2>
                <p className="mt-3 text-[#4A5568] leading-relaxed text-sm">{p.excerpt}</p>
                <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-secondary group-hover:text-brand-primary transition">
                  Read article <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
