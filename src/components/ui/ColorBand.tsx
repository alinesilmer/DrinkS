import { type ReactNode, useRef } from "react";
import { useScrollVars } from "@/hooks/useScrollVars";
import { cx } from "@/lib/text";

export type BandTone = "burnt" | "peach" | "orange";

interface ColorBandProps {
  word: string;
  line: string;
  tone: BandTone;
  /** Tilts the other way, comes in from the right, and puts the art first. */
  flip?: boolean;
  /** The art. It reads --p (arrives, 0 → 1, played in time) and --t (travels up the screen, 0 → 1) from the band. */
  children: ReactNode;
}

/**
 * A tilted solid-colour band like a flyer: big word, one line, art that plays after the band has
 * slid in from the side (left, or right when flipped) as it comes into view.
 */
export function ColorBand({ word, line, tone, flip, children }: ColorBandProps) {
  const band = useRef<HTMLDivElement>(null);
  useScrollVars(band, { playFor: 1900 });

  return (
    <div ref={band} className={cx("band", `band--${tone}`, flip && "band--flip")}>
      <div className="band__text">
        <h2 className="band__word">{word}</h2>
        <p className="band__line">{line}</p>
      </div>
      <div className="band__art">{children}</div>
    </div>
  );
}
