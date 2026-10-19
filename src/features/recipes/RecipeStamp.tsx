import { Button } from "@/components/ui/Button";
import { SpriteUse } from "@/components/ui/Sprite";
import { cssVars } from "@/lib/cssVars";
import { cx } from "@/lib/text";
import { type Recipe } from "@/types/catalog";

// Four little four-pointed sparkles around the arch.
const sparkle = (x: number, y: number, r: number) => {
  const k = r * 0.15;
  return `M${x} ${y - r}Q${x + k} ${y - k} ${x + r} ${y}Q${x + k} ${y + k} ${x} ${y + r}Q${x - k} ${y + k} ${x - r} ${y}Q${x - k} ${y - k} ${x} ${y - r}Z`;
};
const SPARKS = sparkle(9, 16, 6) + sparkle(92, 12, 4.5) + sparkle(84, 104, 4) + sparkle(17, 96, 3.5);

interface RecipeStampProps {
  recipe: Recipe;
  /** Clickable stamp in the list; without it, a static stamp (detail page). */
  onOpen?: () => void;
  large?: boolean;
}

/** A recipe as a postage stamp: arch, glass, sparkles. */
export function RecipeStamp({ recipe, onOpen, large }: RecipeStampProps) {
  const { palette, colors } = recipe;

  const face = (
    <>
      <span className="stamp__perf">
        <span className="stamp__face" style={cssVars({ "--stamp-bg": palette.bg, "--stamp-ink": palette.ink })}>
          <span className="stamp__name">{recipe.name}</span>
          <svg className="stamp__art" viewBox="0 0 100 130" aria-hidden="true" focusable="false">
            <path d="M10 130V54a40 40 0 0 1 80 0V130Z" fill={palette.arch} />
            <path className="stamp__sparks" d={SPARKS} fill="#fff" />
            <SpriteUse
              id={`g-${recipe.glass}`}
              className="stamp__glass"
              vars={{ "--a": colors.top, "--b": colors.bottom, "--f": colors.garnish }}
            />
          </svg>
        </span>
      </span>
    </>
  );

  const className = cx("stamp", large && "stamp--large");
  return onOpen ? (
    <Button className={className} onClick={onOpen}>
      {face}
    </Button>
  ) : (
    <div className={className}>{face}</div>
  );
}
