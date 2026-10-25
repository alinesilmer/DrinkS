import { cssVars } from "@/lib/cssVars";
import { type DECOS } from "@/data/media";

type Deco = (typeof DECOS)[keyof typeof DECOS];

/** One slice or leaf: where (% of the screen), how wide (vw), how far it turns and how far it drifts with the scroll. */
export interface GarnishItem {
  deco: Deco;
  x: number;
  y: number;
  size: number;
  turn: number;
  rise: number;
}

/**
 * Your slices and leaves, floating around a glass. They read --p (0 → 1, the scroll progress of the section that
 * holds them) from the stylesheet: they drift up or down and turn as it grows.
 */
export function Garnish({ items }: { items: readonly GarnishItem[] }) {
  return (
    <div className="garnish" aria-hidden="true">
      {items.map(({ deco, x, y, size, turn, rise }, i) => (
        <span key={i} className="garnish__bit" style={cssVars({ "--x": `${x}%`, "--y": `${y}%`, "--w": `${size}vw`, "--turn": turn, "--rise": rise })}>
          <img src={deco.src} width={deco.width} height={deco.height} alt="" loading="lazy" decoding="async" />
        </span>
      ))}
    </div>
  );
}
