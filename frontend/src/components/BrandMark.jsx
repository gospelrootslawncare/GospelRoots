import React from "react";

/**
 * BrandMark — renders the official Gospel Roots Lawn Care logo (cross with roots).
 *
 * The source image is black-on-white with NO transparency, so we use CSS blend
 * modes to make the white background disappear seamlessly against any surface.
 *
 *  - variant="dark":  use on LIGHT surfaces. mix-blend-multiply drops the white
 *                     background, leaving the black artwork.
 *  - variant="light": use on DARK surfaces. invert() flips to white-on-black,
 *                     then mix-blend-screen drops the black background, leaving
 *                     the white artwork.
 */
export default function BrandMark({
  size = 40,
  variant = "dark",
  className = "",
  title = "Gospel Roots Lawn Care",
  src = "/logo.png",
}) {
  const isLight = variant === "light";
  return (
    <img
      src={src}
      alt={title}
      width={size}
      height={size}
      className={`select-none ${className}`}
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        mixBlendMode: isLight ? "screen" : "multiply",
        filter: isLight ? "invert(1)" : "none",
        pointerEvents: "none",
      }}
      draggable={false}
    />
  );
}
