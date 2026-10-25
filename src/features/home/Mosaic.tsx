import { useRef } from "react";
import { Section } from "@/components/ui/Section";
import { HURRICANE } from "@/features/home/glassShapes";
import { PhotoGlass } from "@/features/home/PhotoGlass";
import { RisingDrink } from "@/features/home/RisingDrink";
import { useScrollVars } from "@/hooks/useScrollVars";
import { cssVars } from "@/lib/cssVars";
import { MOSAIC } from "@/data/homeContent";

/**
 * "Por qué DrinkS", laid out like a bar menu: the whole section is on awning stripes; on the left the glass, which
 * fills with one smooth gradient of colour as you scroll (its surface sways by itself); on the right a solid cream
 * card with the three promises, one line each with dots up to the number, and each line appears when the drink
 * reaches its height (the top line when the glass is full).
 */
export function Mosaic() {
  const section = useRef<HTMLElement>(null);
  useScrollVars(section, { window: [0.12, 0.5] });

  return (
    <Section ref={section} id="verano" className="mosaic" padded={false}>
      <div className="mosaic__stage">
        <PhotoGlass shape={HURRICANE} className="vaso__glass">
          <RisingDrink driver={section} />
        </PhotoGlass>
      </div>
      <div className="mosaic__menu">
        <p className="mosaic__eyebrow">{MOSAIC.eyebrow}</p>
        <h2 className="mosaic__title">{MOSAIC.title}</h2>
        <ul className="mosaic__list">
          {MOSAIC.promises.map((p, i) => (
            <li key={p.title} className="mosaic__item" style={cssVars({ "--k": 2 - i })}>
              <p className="mosaic__row">
                <span className="mosaic__name">{p.title}</span>
                <b className="mosaic__big">
                  {p.big}
                  <small>{p.unit}</small>
                </b>
              </p>
              <p className="mosaic__text">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
