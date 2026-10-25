import { useRef } from "react";
import { Garnish, type GarnishItem } from "@/features/home/Garnish";
import { PourGlass } from "@/features/home/PourGlass";
import { useScrollFrame } from "@/hooks/useScrollFrame";
import { ease, span } from "@/lib/math";
import { pinnedProgress } from "@/lib/scroll";
import { HOME_HERO } from "@/data/homeContent";
import { DECOS } from "@/data/media";

// Your slices and leaves around the glass.
const GARNISH: readonly GarnishItem[] = [
  { deco: DECOS.orange, x: 24, y: 64, size: 10.4, turn: 150, rise: 12 },
  { deco: DECOS.lime, x: 76, y: 68, size: 8.2, turn: -170, rise: -10 },
  { deco: DECOS.leaf, x: 36, y: 50, size: 3.6, turn: -120, rise: 8 },
];

// The edge of the wave: stripes in the same widths as the ones under it (a tile is two stripes, in the units of
// the svg, which is twice as wide as the screen).
const STRIPE = 1200 / 18 / 2;

/**
 * The cover of Inicio: a tall pinned screen on cobalt awning stripes, with the headline in lime capitals and
 * a cursive line over a big glass. As you scroll, the glass tips and the drink pours out; then a wave of the
 * stripes of the next section (Elegí) floods up the screen, with nothing in between. The glass also sloshes
 * when the pointer moves.
 */
export function Hero() {
  const hero = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const flood = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  useScrollFrame(() => {
    if (!hero.current) return;
    const p = pinnedProgress(hero.current);
    progress.current = p;
    // the stylesheet reads --p: the headline and the notes drift away, the slices and leaves float
    pin.current?.style.setProperty("--p", p.toFixed(3));
    if (flood.current) {
      const t = 1 - ease(span(p, 0.46, 0.78));
      flood.current.style.transform = `translateY(calc(${t * 100}% + ${t * 4.3}rem))`;
    }
  });

  return (
    <header ref={hero} className="hero" id="top">
      <div ref={pin} className="hero__pin">
        <Garnish items={GARNISH} />
        <div className="hero__copy">
          <p className="hero__kicker">{HOME_HERO.kicker}</p>
          <h1 className="hero__headline">
            <span className="hero__title">{HOME_HERO.title}</span>
            <span className="hero__script">{HOME_HERO.script}</span>
          </h1>
        </div>
        <p className="hero__note hero__note--left">{HOME_HERO.leftNote}</p>
        <p className="hero__note hero__note--right">{HOME_HERO.rightNote}</p>
        <PourGlass progress={progress} host={pin} />
        <div ref={flood} className="hero__flood">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <defs>
              <pattern id="hero-stripes" width={STRIPE * 2} height="60" patternUnits="userSpaceOnUse">
                <rect width={STRIPE} height="60" style={{ fill: "var(--burnt)" }} />
                <rect x={STRIPE} width={STRIPE} height="60" style={{ fill: "var(--burnt-deep)" }} />
              </pattern>
            </defs>
            <path fill="url(#hero-stripes)" d="M0 30Q150 60 300 30T600 30T900 30T1200 30V60H0Z" />
          </svg>
        </div>
      </div>
    </header>
  );
}
