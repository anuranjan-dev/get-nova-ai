import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*+";

/**
 * Dependency-free "decode" scramble. Renders the final text on first paint
 * (SSR-safe, SEO-safe) and scrambles once after mount.
 */
export function TextScramble({
  children,
  duration = 0.8,
  speed = 0.035,
  className,
}: {
  children: string;
  duration?: number;
  speed?: number;
  className?: string;
}) {
  const target = children;
  const [display, setDisplay] = useState(target);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const start = performance.now();
    const total = duration * 1000;
    const step = Math.max(speed, 0.016) * 1000;
    let last = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / total, 1);

      if (now - last >= step || progress === 1) {
        last = now;
        const revealed = Math.floor(progress * target.length);
        setDisplay(
          target
            .split("")
            .map((char, i) => {
              if (char === " " || i < revealed) return char;
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join(""),
        );
      }

      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [target, duration, speed]);

  return (
    <span className={className} aria-label={target}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
