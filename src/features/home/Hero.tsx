import { useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { PetalBurst } from "@/components/ui/PetalBurst";
import { PourGlass } from "@/features/home/PourGlass";
import { useScrollFrame } from "@/hooks/useScrollFrame";
import { ease, span } from "@/lib/math";
import { pinnedProgress } from "@/lib/scroll";
import { ROUTES } from "@/app/routes";
import { HOME_HERO } from "@/data/homeContent";

/**
 * The cover of Inicio: a tall pinned screen with the headline on either side of a big glass. As you scroll, the big glass tips, the ice falls and
 * the drink pours out; then two waves of colour flood up the screen and carry you into the
 * next section. The glass also sloshes when the pointer moves.
 */
export function Hero() {
  const hero = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const burst = useRef<HTMLDivElement>(null);
  const cta = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  useScrollFrame(() => {
    if (!hero.current) return;
    const p = pinnedProgress(hero.current);
    progress.current = p;
    pin.current?.style.setProperty("--p", p.toFixed(3));
    if (burst.current) burst.current.style.transform = `translate(-50%, -50%) scale(${1 + p * 0.4})`;
    if (cta.current) {
      const shown = 1 - span(p, 0.04, 0.16);
      cta.current.style.opacity = String(shown);
      cta.current.style.pointerEvents = shown > 0.4 ? "auto" : "none";
    }
    pin.current?.querySelectorAll<HTMLElement>("[data-flood]").forEach((flood, i) => {
      const t = 1 - ease(span(p, 0.5 + i * 0.08, 0.8 + i * 0.08));
      flood.style.transform = `translateY(calc(${t * 100}% + ${t * 62}px))`;
    });
  });

  return (
    <header ref={hero} className="hero" id="top">
      <div ref={pin} className="hero__pin">
        <div ref={burst} className="hero__burst">
          <PetalBurst />
        </div>
        <h1 className="hero__title">
          <span className="hero__side hero__side--left">{HOME_HERO.left}</span>
          <span className="hero__side hero__side--right">{HOME_HERO.right}</span>
        </h1>
        <PourGlass progress={progress} host={pin} />
        <div ref={cta} className="hero__cta">
          <ButtonLink variant="primary" href={ROUTES.products}>
            {HOME_HERO.cta}
          </ButtonLink>
        </div>
        {["peach", "paper"].map((tone, i) => (
          <div key={tone} data-flood className={`hero__flood hero__flood--${tone}`}>
            <svg viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <path d={i === 0 ? "M0 30Q150 0 300 30T600 30T900 30T1200 30V60H0Z" : "M0 30Q150 60 300 30T600 30T900 30T1200 30V60H0Z"} />
            </svg>
          </div>
        ))}
      </div>
    </header>
  );
}
