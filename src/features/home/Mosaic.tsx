import { useRef } from "react";
import { PetalBurst } from "@/components/ui/PetalBurst";
import { Section } from "@/components/ui/Section";
import { useScrollVars } from "@/hooks/useScrollVars";
import { cssVars } from "@/lib/cssVars";
import { MOSAIC } from "@/data/homeContent";

// The glass and its three liquid bands (drawn in a 220 × 320 box). Each band grows from its
// own bottom edge, one after another, as --p goes from 0 to 1 (see _mosaic-glass.scss).
const GLASS = "M45 40H175L162 298Q161 308 151 308H69Q59 308 58 298Z";
const wave = (top: number, bottom: number) => `M0 ${top}Q27 ${top - 8} 55 ${top}T110 ${top}T165 ${top}T220 ${top}V${bottom}H0Z`;

/** Which promise sits at which height (bottom band first) and on which side of the glass. */
const NOTES = [
  { promise: 2, band: 0, side: "left", y: "62%" },
  { promise: 1, band: 1, side: "right", y: "34%" },
  { promise: 0, band: 2, side: "left", y: "6%" },
] as const;

/**
 * "Por qué DrinkS": a big drawn glass fills layer by layer as you scroll, over a slowly turning
 * splash of petals; each promise appears on a card beside the layer it belongs to.
 */
export function Mosaic() {
  const stage = useRef<HTMLDivElement>(null);
  useScrollVars(stage, { window: [0.18, 0.55] });

  return (
    <Section id="verano" className="mosaic">
      <div className="mosaic__head">
        <p className="mosaic__eyebrow">{MOSAIC.eyebrow}</p>
        <h2 className="mosaic__title">{MOSAIC.title}</h2>
      </div>
      <div ref={stage} className="vaso">
        <PetalBurst className="vaso__burst" />
        <svg className="vaso__glass" viewBox="0 0 220 320" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id="vaso-clip">
              <path d={GLASS} />
            </clipPath>
          </defs>
          <line x1="128" y1="250" x2="158" y2="10" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
          <line x1="128" y1="250" x2="158" y2="10" stroke="#D2491C" strokeWidth="5" strokeDasharray="5 5" />
          <path d={GLASS} fill="#fff" opacity=".28" />
          <g clipPath="url(#vaso-clip)">
            <path className="vaso__band vaso__band--3" d={wave(62, 140)} />
            <path className="vaso__band vaso__band--2" d={wave(132, 218)} />
            <path className="vaso__band vaso__band--1" d={wave(210, 320)} />
            <g className="vaso__ice" fill="#fff" fillOpacity=".6">
              <rect x="78" y="236" width="30" height="30" rx="7" transform="rotate(-10 93 251)" />
              <rect x="112" y="258" width="26" height="26" rx="6" transform="rotate(14 125 271)" />
              <rect x="96" y="160" width="26" height="26" rx="6" transform="rotate(8 109 173)" />
            </g>
          </g>
          <path d={GLASS} fill="none" stroke="#fff" strokeWidth="5" strokeLinejoin="round" />
          <path d="M62 56L72 270" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".6" />
          <use href="/sprites.svg#slice" x="22" y="20" width="46" height="46" style={cssVars({ "--f": "#7FBF6A" })} />
        </svg>
        {NOTES.map(({ promise, band, side, y }) => {
          const p = MOSAIC.promises[promise];
          return p ? (
            <div key={p.title} className={`vaso__note vaso__note--${side}`} style={cssVars({ "--k": band, "--y": y })}>
              <p className="vaso__big">
                {p.big}
                <span className="vaso__unit">{p.unit}</span>
              </p>
              <h3 className="vaso__title">{p.title}</h3>
              <p className="vaso__text">{p.text}</p>
            </div>
          ) : null;
        })}
      </div>
    </Section>
  );
}
