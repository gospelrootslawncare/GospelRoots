import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
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

export default function BlogPost() {
  useScrollReveal();
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;

  const others = POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div data-testid={`blog-post-${slug}`}>
      <SeasonalBanner />
      <Navbar />
      <main className="bg-brand-base">
        <article className="pt-32 sm:pt-40 pb-16 bg-white border-b border-black/[0.04]">
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <Link
              to="/blog"
              data-testid="blog-back-link"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-secondary hover:text-brand-primary transition"
            >
              <ArrowLeft size={14} /> All articles
            </Link>
            <div className="mt-6 flex items-center gap-3 text-xs text-[#4A5568]">
              <span className="uppercase tracking-[0.18em] text-brand-accent font-semibold">Article</span>
              <span>·</span>
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1"><Clock size={11} /> {post.readMinutes} min read</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-primary mt-4 tracking-tight leading-[1.05]">
              {post.title}
            </h1>
            <p className="mt-5 text-lg text-[#4A5568] leading-relaxed">{post.excerpt}</p>

            <div className="mt-10 prose prose-lg max-w-none">
              <div className="text-[#1f2a23] text-base sm:text-[17px] leading-[1.75] whitespace-pre-wrap font-[Manrope]">
                {post.body}
              </div>
            </div>

            <div className="mt-14 rounded-3xl bg-brand-primary text-white p-8 sm:p-10">
              <div className="text-xs uppercase tracking-[0.22em] text-[#cbe2d0] font-semibold">Need help with your yard?</div>
              <div className="font-serif text-3xl mt-2">We’ll take it from here.</div>
              <p className="mt-3 text-white/85 max-w-xl">
                Free estimate within 24 hours. Honest pricing, dependable service in Gilmer, TX.
              </p>
              <Link
                to="/#contact"
                data-testid="blog-cta-quote"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-brand-primary px-6 py-3 text-sm font-semibold hover:bg-[#F9F8F6] transition"
              >
                Get a Free Quote <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </article>

        {others.length > 0 && (
          <section className="py-16">
            <div className="max-w-3xl mx-auto px-5 sm:px-8">
              <div className="text-xs uppercase tracking-[0.22em] text-brand-accent font-semibold">More to read</div>
              <div className="mt-5 grid md:grid-cols-2 gap-5">
                {others.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="rounded-2xl bg-white border border-black/[0.05] p-6 hover:shadow-md transition"
                  >
                    <div className="font-serif text-xl text-brand-primary leading-tight">{p.title}</div>
                    <div className="mt-2 text-sm text-[#4A5568] line-clamp-2">{p.excerpt}</div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
