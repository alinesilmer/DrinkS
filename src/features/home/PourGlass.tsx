import { type MutableRefObject, type RefObject, useEffect, useRef } from "react";
import { GLASS_PHOTO } from "@/data/media";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { runWhileVisible } from "@/lib/frameLoop";
import { clamp, ease, span } from "@/lib/math";

// The big glass of the cover. It tips as `progress` (0 → 1, the pinned scroll) grows and the
// drink pours out. The liquid is a wavy path that stays
// level, sloshes on a spring when the pointer moves or the glass tilts, and drops to the lip once
// the lip dips below the fill line. Coordinates are in the glass's own units.
const LIP = [98, -110] as const;
const REST = -70;
const MAX_TILT = 100;
const TILT = [0.04, 0.5] as const;
const DRY = [0.62, 0.78] as const;
const STREAM = { width: 15, length: 1100 };
const SWAY = 6;
const WAVE = 3;
const HALF_WIDTH = 340;

// The inside of the bowl of the photo of the glass (public/media/glass2.webp): the liquid is clipped to it.
const BOWL = "M-90-110C-114-70-122-30-119 5C-114 50-70 84 0 87C70 84 114 50 119 5C122-30 113-70 96-110Z";

// Where the photo sits in the glass's own units: 1122 × 1402 px at 0.333 per px, the axis of the glass on x = 0
// and the centre of its rim on y = -110 (the slice of orange is part of the photo; the lip it pours from is the
// right end of the rim). The photo was lightened
// inside the bowl (the glass is milky there) so the drink behind it keeps its colour.
// The glass stands under the headline of the cover, and tips about the same point.
const RIG = { y: 660, scale: 1.14 };
const GLASS = { src: GLASS_PHOTO, x: -194.8, y: -191.6, width: 373.6, height: 466.9 };
const GLASS_IMAGE = <image href={GLASS.src} x={GLASS.x} y={GLASS.y} width={GLASS.width} height={GLASS.height} />;
const tiltAt = (p: number) => ease(span(p, TILT[0], TILT[1]));

const lipAt = (angle: number) => {
  const r = (angle * Math.PI) / 180;
  const [cos, sin] = [Math.cos(r), Math.sin(r)];
  return [LIP[0] * cos - LIP[1] * sin, LIP[0] * sin + LIP[1] * cos] as const;
};

// the scroll progress at which the lip first dips below the liquid: the stream starts there
const POUR_STARTS = (() => {
  for (let i = 0; i <= 400; i++) if (lipAt(MAX_TILT * tiltAt(i / 400))[1] > REST) return i / 400;
  return 1;
})();

interface PourGlassProps {
  /** Scroll progress of the pinned cover, written by the cover and read here every frame. */
  progress: MutableRefObject<number>;
  /** The element that listens to the pointer. */
  host: RefObject<HTMLElement | null>;
}

export function PourGlass({ progress, host }: PourGlassProps) {
  const root = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const hostEl = host.current;
    const svg = root.current;
    if (!hostEl || !svg) return undefined;
    const rigEl = svg.querySelector("[data-rig]");
    const edgeEl = svg.querySelector("[data-edge]");
    // the drink is three paths with the same outline (colour, depth, sides), the stream is three strokes (edge, body, core)
    const liquidEls = [...svg.querySelectorAll("[data-liquid]")];
    const streamEls = [...svg.querySelectorAll<SVGPathElement>("[data-stream]")];
    if (!rigEl || !edgeEl || liquidEls.length === 0 || streamEls.length === 0) return undefined;
    // the parts that tip with the glass
    const tipping = [...svg.querySelectorAll("[data-tip]")];

    const streamGroup = streamEls[0]?.parentElement;
    if (!streamGroup) return undefined;

    const s = { hover: 0, target: 0, slope: 0, v: 0, energy: 0, a: 0, soft: false };

    const onMove = (e: PointerEvent) => {
      const r = hostEl.getBoundingClientRect();
      s.target = ((e.clientX - r.left) / r.width - 0.5) * 2;
      s.v += clamp(e.movementX || 0, -40, 40) * 0.0007;
      s.energy = Math.min(1, s.energy + (Math.abs(e.movementX || 0) + Math.abs(e.movementY || 0)) * 0.004);
    };
    const onLeave = () => {
      s.target = 0;
    };
    hostEl.addEventListener("pointermove", onMove);
    hostEl.addEventListener("pointerleave", onLeave);

    const draw = (now: number) => {
      const t = now / 1000;
      const p = progress.current;
      const tilt = tiltAt(p);

      s.hover += (s.target - s.hover) * 0.07;
      const a = MAX_TILT * tilt + s.hover * SWAY * (1 - tilt);
      s.v += (s.a - a) * 0.006 - s.slope * 0.05;
      s.v *= 0.93;
      s.slope = clamp(s.slope + s.v, -0.4, 0.4);
      s.energy = Math.min(1, s.energy * 0.975 + Math.abs(a - s.a) * 0.04);
      s.a = a;

      const [lx, ly] = lipAt(a);
      const surface = Math.max(REST, ly);
      const slope = s.slope * (ly > REST ? 0.3 : 1);
      const amp = WAVE * (0.7 + s.energy * 3.5);

      rigEl.setAttribute("transform", `translate(${500 - 50 * tilt} ${RIG.y - 100 * tilt}) scale(${RIG.scale})`);
      tipping.forEach((el) => el.setAttribute("transform", `rotate(${a})`));

      let edge = "";
      for (let x = -HALF_WIDTH; x <= HALF_WIDTH; x += 17) {
        const wave = amp * (Math.sin(x * 0.03 + t * 2.3) + 0.5 * Math.sin(x * 0.055 - t * 3.4));
        edge += `${x === -HALF_WIDTH ? "M" : "L"}${x} ${(surface + slope * x + wave).toFixed(1)}`;
      }
      // the body of the drink hangs from its surface; the surface itself also gets a thin bright line (the meniscus)
      const body = `${edge.replace("M", `M${-HALF_WIDTH} 2000L`)}L${HALF_WIDTH} 2000Z`;
      liquidEls.forEach((el) => el.setAttribute("d", body));
      edgeEl.setAttribute("d", edge);

      const grow = span(p, POUR_STARTS, POUR_STARTS + 0.16);
      const width = STREAM.width * Math.min(1, grow * 4) * (1 - span(p, DRY[0], DRY[1]));
      // no stream (before the pour, after it dried up): nothing to redraw, and no blur to pay for. The frame it
      // disappears on, the strokes are drawn once more at width 0.
      const streaming = width > 0.05;
      if (!streaming && !s.soft) return;
      if (streaming !== s.soft) {
        s.soft = streaming;
        if (streaming) streamGroup.setAttribute("filter", "url(#pour-soft)");
        else streamGroup.removeAttribute("filter");
      }
      // the stream leaves the lip in an arc, then falls and sways a little as it goes
      const fall = STREAM.length * grow;
      const SEGMENTS = 14;
      let path = `M${lx} ${ly}C${lx + 24} ${ly - 2} ${lx + 38} ${ly + 22} ${lx + 40} ${ly + 70}`;
      let prev = 0;
      for (let k = 1; k <= SEGMENTS; k++) {
        const sway = Math.sin(t * 3.2 + k * 0.8) * 3.2 * Math.min(1, k / 4);
        path += `l${(sway - prev).toFixed(2)} ${(fall / SEGMENTS).toFixed(1)}`;
        prev = sway;
      }
      streamEls.forEach((el) => {
        el.setAttribute("d", path);
        el.setAttribute("stroke-width", String(width * Number(el.dataset.k)));
        el.setAttribute("transform", `translate(${(width * Number(el.dataset.dx)).toFixed(2)} 0)`);
      });
    };

    const stopLoop = prefersReducedMotion() ? undefined : runWhileVisible(hostEl, draw);
    if (!stopLoop) draw(0);

    return () => {
      stopLoop?.();
      hostEl.removeEventListener("pointermove", onMove);
      hostEl.removeEventListener("pointerleave", onLeave);
    };
  }, [host, progress]);

  return (
    <svg ref={root} className="pour" viewBox="200 0 600 1000" aria-hidden="true" focusable="false">
      <defs>
        {/* the colour: light at the surface, deeper below */}
        <linearGradient id="pour-drink" gradientUnits="userSpaceOnUse" x1="0" y1="-100" x2="0" y2="96">
          <stop offset="0" style={{ stopColor: "var(--pop-light)" }} />
          <stop offset="0.35" style={{ stopColor: "var(--pop)" }} />
          <stop offset="1" style={{ stopColor: "color-mix(in srgb, var(--pop) 90%, #b83a00)" }} />
        </linearGradient>
        {/* depth: the drink darkens towards the bottom of the glass */}
        <linearGradient id="pour-depth" gradientUnits="userSpaceOnUse" x1="0" y1="-100" x2="0" y2="100">
          <stop offset="0" stopColor="#fff" stopOpacity="0.2" />
          <stop offset="0.3" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" style={{ stopColor: "var(--ink)" }} stopOpacity="0.16" />
        </linearGradient>
        {/* the sides: the drink darkens where it meets the glass, and catches a little light on the left */}
        <linearGradient id="pour-side" gradientUnits="userSpaceOnUse" x1="-130" y1="0" x2="130" y2="0">
          <stop offset="0" style={{ stopColor: "var(--ink)" }} stopOpacity="0.2" />
          <stop offset="0.14" style={{ stopColor: "var(--ink)" }} stopOpacity="0" />
          <stop offset="0.26" stopColor="#fff" stopOpacity="0.14" />
          <stop offset="0.38" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.86" style={{ stopColor: "var(--ink)" }} stopOpacity="0" />
          <stop offset="1" style={{ stopColor: "var(--ink)" }} stopOpacity="0.18" />
        </linearGradient>
        {/* the stream is softened a little, so it melts into the colours around it (the region is just where it can be) */}
        <filter id="pour-soft" filterUnits="userSpaceOnUse" x="-100" y="-200" width="400" height="1700">
          <feGaussianBlur stdDeviation="1.8" />
        </filter>
        <clipPath id="pour-bowl">
          <path data-tip d={BOWL} />
        </clipPath>
      </defs>
      <g data-rig transform={`translate(500 ${RIG.y}) scale(${RIG.scale})`}>
        <g clipPath="url(#pour-bowl)">
          <path data-liquid fill="url(#pour-drink)" />
          <path data-liquid fill="url(#pour-depth)" />
          <path data-liquid fill="url(#pour-side)" />
          <path data-edge className="pour__edge" fill="none" strokeLinecap="round" />
        </g>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path data-stream data-k="1.14" data-dx="0" className="pour__stream pour__stream--edge" />
          <path data-stream data-k="1" data-dx="0" className="pour__stream" />
          <path data-stream data-k="0.3" data-dx="-0.2" className="pour__stream pour__stream--core" />
        </g>
        <g data-tip>{GLASS_IMAGE}</g>
      </g>
    </svg>
  );
}
