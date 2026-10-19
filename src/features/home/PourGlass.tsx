import { type MutableRefObject, type RefObject, useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { clamp, ease, span } from "@/lib/math";

// The big glass of the cover. It tips as `progress` (0 → 1, the pinned scroll) grows, the ice
// slides to the lip and falls, and the drink pours out. The liquid is a wavy path that stays
// level, sloshes on a spring when the pointer moves or the glass tilts, and drops to the lip once
// the lip dips below the fill line. Coordinates are in the glass's own units.
const LIP = [105, -110] as const;
const REST = -74;
const MAX_TILT = 100;
const TILT = [0.05, 0.58] as const;
const DRY = [0.78, 0.92] as const;
const STREAM = { width: 15, length: 1100 };
const SWAY = 6;
const WAVE = 3;
const HALF_WIDTH = 340;

const CUBES = [
  { x: -50, y: -10, spin: 220, size: 52, opacity: 0.62 },
  { x: 42, y: 6, spin: -260, size: 46, opacity: 0.54 },
  { x: -6, y: 52, spin: 320, size: 44, opacity: 0.62 },
  { x: 66, y: 58, spin: -190, size: 38, opacity: 0.5 },
].map((cube, i) => ({ ...cube, at: 0.26 + i * 0.08 }));

const BOWL = "M-105-110C-150-20-110 120 0 125C110 120 150-20 105-110Z";

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
    const find = <T extends Element>(selector: string) => svg?.querySelector<T>(selector) ?? null;
    const [rigEl, liquidEl, streamEl] = [find("[data-rig]"), find("[data-liquid]"), find("[data-stream]")];
    if (!hostEl || !svg || !rigEl || !liquidEl || !streamEl) return undefined;
    // the parts that tip with the glass, and the ice
    const tipping = [...svg.querySelectorAll("[data-tip]")];
    const cubes = [...svg.querySelectorAll("[data-cube]")];

    const s = { hover: 0, target: 0, slope: 0, v: 0, energy: 0, a: 0 };

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

      rigEl.setAttribute("transform", `translate(${500 - 50 * tilt} ${545 - 100 * tilt}) scale(1.75)`);
      tipping.forEach((el) => el.setAttribute("transform", `rotate(${a})`));

      let d = `M${-HALF_WIDTH} 2000`;
      for (let x = -HALF_WIDTH; x <= HALF_WIDTH; x += 17) {
        const wave = amp * (Math.sin(x * 0.03 + t * 2.3) + 0.5 * Math.sin(x * 0.055 - t * 3.4));
        d += `L${x} ${(surface + slope * x + wave).toFixed(1)}`;
      }
      liquidEl.setAttribute("d", `${d}L${HALF_WIDTH} 2000Z`);

      const grow = span(p, POUR_STARTS, POUR_STARTS + 0.16);
      streamEl.setAttribute("d", `M${lx} ${ly}q26 2 30 60v${STREAM.length * grow}`);
      streamEl.setAttribute("stroke-width", String(STREAM.width * Math.min(1, grow * 4) * (1 - span(p, DRY[0], DRY[1]))));

      const [cos, sin] = [Math.cos((a * Math.PI) / 180), Math.sin((a * Math.PI) / 180)];
      CUBES.forEach((cube, i) => {
        const tt = span(p, cube.at, cube.at + 0.3);
        const k = ease(Math.min(1, tt * 3));
        const fall = Math.max(0, tt - 0.33) / 0.67;
        const x0 = cube.x * cos - cube.y * sin + Math.sin(t * 0.9 + i * 2) * 3;
        const y0 = cube.x * sin + cube.y * cos + Math.sin(t * 1.6 + i * 1.9) * 4;
        const turn = a + cube.spin * tt + Math.sin(t * 1.1 + i) * 8 + i * 20;
        cubes[i]?.setAttribute(
          "transform",
          `translate(${x0 + (lx - x0) * k + fall * 40} ${y0 + (ly - y0) * k + fall * fall * 950}) rotate(${turn})`,
        );
      });
    };

    let frame = 0;
    const loop = (now: number) => {
      if (hostEl.getBoundingClientRect().bottom > 0) draw(now);
      frame = requestAnimationFrame(loop);
    };
    if (prefersReducedMotion()) draw(0);
    else frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      hostEl.removeEventListener("pointermove", onMove);
      hostEl.removeEventListener("pointerleave", onLeave);
    };
  }, [host, progress]);

  return (
    <svg ref={root} className="pour" viewBox="200 0 600 1000" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="pour-drink" gradientUnits="userSpaceOnUse" x1="0" y1="-90" x2="0" y2="125">
          <stop offset="0" style={{ stopColor: "var(--pop-light)" }} />
          <stop offset="0.5" style={{ stopColor: "var(--pop)" }} />
          <stop offset="1" style={{ stopColor: "var(--pop)", stopOpacity: 0.85 }} />
        </linearGradient>
        <clipPath id="pour-bowl">
          <path data-tip d={BOWL} />
        </clipPath>
      </defs>
      <g data-rig transform="translate(500 545) scale(1.75)">
        <g data-tip>
          <path d="M-6 122V228C-6 240-88 242-88 254H88C88 242 6 240 6 228V122Z" fill="#fff" opacity=".9" />
          <path d={BOWL} fill="#fff" opacity=".4" />
          <line x1="-10" y1="92" x2="-58" y2="-222" stroke="#fff" strokeWidth="12" strokeLinecap="round" />
          <line x1="-10" y1="92" x2="-58" y2="-222" stroke="#D2491C" strokeWidth="12" strokeDasharray="12 12" />
        </g>
        <g clipPath="url(#pour-bowl)">
          <path data-liquid fill="url(#pour-drink)" opacity=".97" />
        </g>
        <path data-stream className="pour__stream" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {CUBES.map((cube, i) => (
          <g key={i} data-cube>
            <rect
              x={-cube.size / 2}
              y={-cube.size / 2}
              width={cube.size}
              height={cube.size}
              rx="10"
              fill="#fff"
              opacity={cube.opacity}
              stroke="#fff"
              strokeWidth="3"
            />
          </g>
        ))}
        <g data-tip>
          <path d={BOWL} fill="none" stroke="#fff" strokeWidth="4" />
          <path d="M-104-40C-108 20-84 74-44 98" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity=".75" />
          <g transform="translate(-106 -114) rotate(-18)">
            <circle r="42" fill="#FBF3E2" stroke="#F78F3F" strokeWidth="6" />
            <circle r="30" fill="#F78F3F" />
            <path d="M0-30V30M-30 0H30M-21-21L21 21M21-21L-21 21" stroke="#FBF3E2" strokeWidth="3.5" />
          </g>
        </g>
      </g>
    </svg>
  );
}
