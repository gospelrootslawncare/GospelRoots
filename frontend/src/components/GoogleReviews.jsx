import React from "react";
import { Star } from "lucide-react";

/**
 * Google Reviews placeholder. Once you create a Google Business Profile and get
 * a Place ID, swap PLACE_ID below or set REACT_APP_GOOGLE_PLACE_ID to enable
 * a real reviews widget via the Place Details API.
 */
const PLACE_ID = process.env.REACT_APP_GOOGLE_PLACE_ID || "";

export default function GoogleReviews() {
  if (!PLACE_ID) {
    return (
      <section
        id="google-reviews"
        data-testid="google-reviews-placeholder"
        className="relative py-16 sm:py-20 bg-white"
      >
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="rounded-3xl border border-dashed border-black/15 bg-brand-base p-8 sm:p-10 text-center">
            <div className="inline-flex items-center gap-1 text-brand-accent">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} size={18} fill="currentColor" stroke="none" />
              ))}
            </div>
            <h3 className="font-serif text-2xl text-brand-primary mt-4">
              Loved working with us? Leave a Google review.
            </h3>
            <p className="mt-3 text-sm text-[#4A5568]">
              We’re building our Google Business Profile — once it’s live, real customer reviews will appear here.
              In the meantime, please mention us to a neighbor or share your experience by email.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // When PLACE_ID is configured, render a link to the Google reviews page.
  const reviewLink = `https://search.google.com/local/reviews?placeid=${PLACE_ID}`;
  return (
    <section id="google-reviews" data-testid="google-reviews" className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <h3 className="font-serif text-2xl text-brand-primary">Read our Google reviews</h3>
        <a
          href={reviewLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-primary text-white px-5 py-2.5 text-sm font-semibold hover:bg-brand-secondary transition"
        >
          ★ View on Google
        </a>
      </div>
    </section>
  );
}
