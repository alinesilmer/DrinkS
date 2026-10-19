import { Sprite } from "@/components/ui/Sprite";
import { cssVars } from "@/lib/cssVars";
import { type Scene, type SceneItem } from "@/types/scene";

const BIT_BOX = "0 0 40 40";

const place = ({ x, y, w, r = 0, dx = 0, dy = 0, spin = 0, lag = 0, drift = 0, turn = 0 }: SceneItem) =>
  cssVars({
    "--x": `${x}%`,
    "--y": `${y}%`,
    "--w": `${w}%`,
    "--r": r,
    "--dx": dx,
    "--dy": dy,
    "--spin": spin,
    "--lag": lag,
    "--drift": drift,
    "--turn": turn,
  });

/** Cocktails drawn with the glasses of the recipe stamps. Moves with the --p / --t of its parent. */
export function CocktailScene({ scene }: { scene: Scene }) {
  return (
    <div className="scene" aria-hidden="true">
      {scene.glasses.map((glass, i) => (
        <span key={i} className="scene__item scene__item--glass" style={place(glass)}>
          <Sprite id={`g-${glass.kind}`} vars={{ "--a": glass.colors[0], "--b": glass.colors[1], "--f": glass.colors[2] }} />
        </span>
      ))}
      {scene.bits.map((bit, i) => (
        <span key={i} className={`scene__item scene__item--${bit.kind}`} style={place(bit)}>
          <Sprite id={bit.kind} viewBox={BIT_BOX} vars={bit.color ? { "--f": bit.color } : undefined} />
        </span>
      ))}
    </div>
  );
}
