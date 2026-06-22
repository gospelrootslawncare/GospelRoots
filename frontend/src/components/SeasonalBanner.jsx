import React, { useEffect, useState } from "react";
import { X, Sparkles } from "lucide-react";

const STORAGE_KEY = "grlc_banner_dismissed_v1";

/**
 * Top-of-page dismissible promo banner.
 * Dismissal persists in localStorage so it stays hidden between visits.
 */
export default function SeasonalBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY) === "1";
      if (!dismissed) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  if (!open) return null;

  const dismiss = () => {
    try { localStorage.setItem(STORAGE_KEY, "1"); } catch { /* ignore */ }
    setOpen(false);
  };

  return (
    <div
      data-testid="seasonal-banner"
      className="relative z-40 bg-brand-primary text-white"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-2.5 flex items-center justify-between gap-4">
        <a
          href="#contact"
          className="flex items-center gap-2 text-xs sm:text-sm font-medium hover:text-[#cbe2d0] transition"
          data-testid="banner-cta"
        >
          <Sparkles size={14} className="text-[#cbe2d0]" />
          <span>
            <strong className="font-semibold">Now booking</strong> weekly mowing and fall cleanups in Gilmer, TX — free estimate within 24 hours.
          </span>
        </a>
        <button
          onClick={dismiss}
          aria-label="Dismiss banner"
          data-testid="banner-dismiss"
          className="opacity-70 hover:opacity-100 transition flex-shrink-0"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
