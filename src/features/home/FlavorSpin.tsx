import { useRef } from "react";
import { Section } from "@/components/ui/Section";
import { Garnish, type GarnishItem } from "@/features/home/Garnish";
import { ROCKS, TALL } from "@/features/home/glassShapes";
import { PhotoGlass } from "@/features/home/PhotoGlass";
import { useScrollFrame } from "@/hooks/useScrollFrame";
import { ease, span } from "@/lib/math";
import { pinnedProgress } from "@/lib/scroll";
import { BANDS } from "@/data/homeContent";
import { DECOS } from "@/data/media";

/** How much of the next colour shows at the right edge before it comes in, in % of the width. */
const TEASER = 9;
/** The stretch of the scroll (0 → 1) in which each change of colour happens. */
const WIPES = [
  [0.2, 0.42],
  [0.58, 0.8],
] as const;

// What floats around the glass: where (% of the screen), how wide (vw), how it turns and how far it drifts.
const GARNISH: readonly GarnishItem[] = [
  { deco: DECOS.orange, x: 21, y: 22, size: 9, turn: 140, rise: 14 },
  { deco: DECOS.leaf, x: 77, y: 64, size: 4.6, turn: -110, rise: -10 },
  { deco: DECOS.lime, x: 81, y: 20, size: 8, turn: -160, rise: 12 },
  { deco: DECOS.leaf, x: 17, y: 72, size: 4, turn: 90, rise: -8 },
];

// The drink in each glass: a level surface with a little wave, in the pixels of the photo of that glass, and the
// bright line where the drink meets the air.
const edge = (top: number) => `M0 ${top}Q128 ${top - 30} 256 ${top}T512 ${top}T768 ${top}T1024 ${top}T1280 ${top}`;

function Drink({ top, bottom }: { top: number; bottom: number }) {
  return (
    <>
      <path className="flavors__drink" d={`${edge(top)}V${bottom}H0Z`} />
      <path className="flavors__edge" d={edge(top)} />
    </>
  );
}

/**
 * Elegí · Mezclá · Brindá: one screen that stays put while you scroll. The next colour comes in from the right
 * edge, the giant word changes behind the glass, and the glass turns once with every change: Elegí is the tall
 * glass, Mezclá the short one, Brindá the short one and the tall one clinking; the drink takes the colour of the word.
 */
export function FlavorSpin() {
  const section = useRef<HTMLElement>(null);
  const active = useRef(-1);

  useScrollFrame(() => {
    const el = section.current;
    if (!el) return;
    const p = pinnedProgress(el);
    const [t1, t2] = WIPES.map(([from, to]) => ease(span(p, from, to))) as [number, number];
    // the left edge of the second and third colour, in % of the width
    const teaser2 = TEASER * span(p, 0.46, 0.56);
    const set = (name: string, value: number) => el.style.setProperty(name, value.toFixed(2));
    set("--cut1", 100 - (TEASER + (100 - TEASER) * t1));
    set("--cut2", 100 - (teaser2 + (100 - teaser2) * t2));
    set("--spin", 360 * (t1 + t2));
    set("--p", p);

    // the glass is swapped while it stands edge-on (a quarter of the way round), so you never see it happen
    const now = t2 > 0.25 ? 2 : t1 > 0.25 ? 1 : 0;
    if (now !== active.current) {
      active.current = now;
      el.dataset.slide = String(now);
      el.style.setProperty("--drink", BANDS[now]?.drink ?? "");
    }
  });

  return (
    <Section ref={section} id="sabores" className="flavors" padded={false}>
      <div className="flavors__pin">
        {BANDS.map((band, i) => (
          <div key={band.word} className={`flavors__panel flavors__panel--${i}`}>
            <h2 className="flavors__word">{band.word}</h2>
          </div>
        ))}
        <Garnish items={GARNISH} />
        <div className="flavors__stage">
          <div className="flavors__spin">
            <PhotoGlass shape={TALL} className="flavors__glass flavors__glass--0">
              <Drink top={760} bottom={1500} />
            </PhotoGlass>
            <PhotoGlass shape={ROCKS} className="flavors__glass flavors__glass--1">
              <Drink top={500} bottom={1100} />
            </PhotoGlass>
            <div className="flavors__glass flavors__glass--2">
              <PhotoGlass shape={ROCKS} className="flavors__toast flavors__toast--left">
                <Drink top={500} bottom={1100} />
              </PhotoGlass>
              <PhotoGlass shape={TALL} className="flavors__toast flavors__toast--right">
                <Drink top={760} bottom={1500} />
              </PhotoGlass>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
