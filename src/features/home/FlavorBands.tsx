import { ColorBand } from "@/components/ui/ColorBand";
import { Section } from "@/components/ui/Section";
import { CocktailScene } from "@/features/home/CocktailScene";
import { BANDS } from "@/data/homeContent";

/** Elige · Mezcla · Brinda: three colour bands, tilted like stacked summer flyers, each with a drawn cocktail. */
export function FlavorBands() {
  return (
    <Section id="sabores" className="bands" padded={false}>
      {BANDS.map(({ scene, ...band }, i) => (
        <ColorBand key={band.word} {...band} flip={i % 2 === 1}>
          <CocktailScene scene={scene} />
        </ColorBand>
      ))}
    </Section>
  );
}
