import { type CssVars, cssVars } from "@/lib/cssVars";

/** Ids of the illustrations in public/sprites.svg. */
export type SpriteId = "bottle" | "g-coupe" | "g-high" | "g-wine" | "g-hurricane" | "g-rocks" | "ice" | "mint" | "slice" | "spark";

interface SpriteProps {
  id: SpriteId;
  /** CSS variables the illustration reads (--a, --b, --f). */
  vars?: CssVars;
  className?: string;
}

/**
 * One <use> pointing into the shared sprite file. The file is fetched once and cached,
 * instead of repeating the same SVG markup in every component.
 */
export function SpriteUse({ id, vars, className }: SpriteProps) {
  return <use href={`/sprites.svg#${id}`} className={className} style={vars && cssVars(vars)} />;
}

export function Sprite({ id, vars, className, viewBox = "0 0 100 130" }: SpriteProps & { viewBox?: string }) {
  return (
    <svg className={className} viewBox={viewBox} aria-hidden="true" focusable="false">
      <SpriteUse id={id} vars={vars} />
    </svg>
  );
}
