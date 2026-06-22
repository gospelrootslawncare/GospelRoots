import React, { useRef, useState, useCallback, useEffect } from "react";

/**
 * Before / After image slider. Drag or click to compare.
 */
export default function BeforeAfter({ before, after, beforeAlt = "Before", afterAlt = "After", testId }) {
  const containerRef = useRef(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  const setFromClientX = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  const onMove = useCallback((e) => {
    if (!dragging) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    setFromClientX(x);
  }, [dragging, setFromClientX]);

  useEffect(() => {
    const up = () => setDragging(false);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
    };
  }, [onMove]);

  return (
    <div
      ref={containerRef}
      data-testid={testId}
      className="ba-slider rounded-2xl shadow-lg aspect-[4/3] w-full bg-black/10 cursor-ew-resize"
      onMouseDown={(e) => { setDragging(true); setFromClientX(e.clientX); }}
      onTouchStart={(e) => { setDragging(true); setFromClientX(e.touches[0].clientX); }}
    >
      <img src={after} alt={afterAlt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <img
          src={before}
          alt={beforeAlt}
          className="absolute inset-0 h-full object-cover"
          style={{ width: containerRef.current ? containerRef.current.clientWidth : "100%", maxWidth: "none" }}
          loading="lazy"
        />
      </div>
      <div className="ba-handle" style={{ left: `calc(${pos}% - 1.5px)` }} aria-hidden />
      <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.18em] bg-black/55 text-white px-2.5 py-1 rounded-full">
        Before
      </span>
      <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.18em] bg-white/90 text-brand-primary px-2.5 py-1 rounded-full font-semibold">
        After
      </span>
    </div>
  );
}
