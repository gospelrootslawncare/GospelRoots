import React from "react";

// Minimal logo: cross with roots growing from the bottom.
// Uses currentColor so the parent controls hue (light on dark / dark on light).
export default function Logo({ size = 36, className = "", title = "Gospel Roots Lawn Care" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={className}
      fill="none"
    >
      <title>{title}</title>
      {/* Cross */}
      <rect x="29" y="6" width="6" height="30" rx="1.5" fill="currentColor" />
      <rect x="20" y="15" width="24" height="6" rx="1.5" fill="currentColor" />
      {/* Roots growing from base of cross */}
      <path
        d="M32 36 C 32 42, 26 44, 22 48 C 18 52, 16 56, 14 58"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M32 36 C 32 42, 38 44, 42 48 C 46 52, 48 56, 50 58"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M32 36 L 32 58"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Tiny leaves at root tips */}
      <circle cx="14" cy="58" r="2" fill="currentColor" />
      <circle cx="32" cy="58" r="2" fill="currentColor" />
      <circle cx="50" cy="58" r="2" fill="currentColor" />
    </svg>
  );
}
