import { type RefObject, useEffect, useId, useRef } from "react";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { clamp } from "@/lib/math";

// The drink of the tall glass, in the pixels of its photo (1086 wide). It is ONE liquid that rises: its level follows
// `--p` (0 → 1, written on the section by the scroll) and its surface sways by itself. The colour is one smooth pink
// gradient (blush at the top, rose, then a deep raspberry at the bottom) fixed to the glass, so the colours never jump
// between bands.
const WIDTH = 1086;
const FULL = 440;
const EMPTY = 1100;
const SAMPLE = 18;

interface RisingDriveProps {
  /** The element that holds `--p`. */
  driver: RefObject<HTMLElement | null>;
}

export function RisingDrink({ driver }: RisingDriveProps) {
  const id = useId().replace(/:/g, "");
  const body = useRef<SVGPathElement>(null);
  const edge = useRef<SVGPathElement>(null);

  useEffect(() => {
    const host = driver.current;
    const bodyEl = body.current;
    const edgeEl = edge.current;
    if (!host || !bodyEl || !edgeEl) return undefined;

    const draw = (now: number) => {
      const t = now / 1000;
      const level = prefersReducedMotion() ? 1 : clamp(parseFloat(host.style.getPropertyValue("--p")) || 0);
      const surface = EMPTY - (EMPTY - FULL) * level;
      // the waves are tall while the glass fills and settle as it gets full
      const amp = 16 * (1 - level * 0.55);
      let edgePath = "";
      for (let x = 0; x <= WIDTH + SAMPLE; x += SAMPLE) {
        const y = surface + amp * (Math.sin(x * 0.011 + t * 1.9) + 0.5 * Math.sin(x * 0.023 - t * 2.7));
        edgePath += `${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`;
      }
      edgeEl.setAttribute("d", edgePath);
      bodyEl.setAttribute("d", `${edgePath}L${WIDTH + SAMPLE} ${EMPTY + 40}L0 ${EMPTY + 40}Z`);
    };

    let frame = 0;
    const loop = (now: number) => {
      const r = host.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) draw(now);
      frame = requestAnimationFrame(loop);
    };
    if (prefersReducedMotion()) draw(0);
    else frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [driver]);

  return (
    <>
      <defs>
        <linearGradient id={`${id}-colour`} gradientUnits="userSpaceOnUse" x1="0" y1={FULL} x2="0" y2="1060">
          <stop offset="0" stopColor="#ffe3ee" />
          <stop offset="0.09" stopColor="#ffd0e2" />
          <stop offset="0.18" stopColor="#ffbcd6" />
          <stop offset="0.27" stopColor="#ffa8ca" />
          <stop offset="0.36" stopColor="#ff94bd" />
          <stop offset="0.45" stopColor="#fc80b0" />
          <stop offset="0.55" stopColor="#f66ca3" />
          <stop offset="0.64" stopColor="#ef5896" />
          <stop offset="0.73" stopColor="#e64588" />
          <stop offset="0.82" stopColor="#dc3479" />
          <stop offset="0.91" stopColor="#d02569" />
          <stop offset="1" stopColor="#c21a5c" />
        </linearGradient>
      </defs>
      <path ref={body} fill={`url(#${id}-colour)`} />
      <path ref={edge} className="vaso__edge" />
    </>
  );
}
