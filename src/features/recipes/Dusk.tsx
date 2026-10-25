import { Heading, Section } from "@/components/ui/Section";
import { RecipeStudio } from "@/features/recipes/RecipeStudio";
import { RECIPE_BOOK } from "@/data/content";
import { type IngredientGroup, type Recipe } from "@/types/catalog";

// The title, the wide notepad and the stamp album under it, on deep cobalt stripes.
export function Dusk({ recipes, groups }: { recipes: Recipe[]; groups: IngredientGroup[] }) {
  return (
    <Section id="recetas" className="dusk">
      <div className="wrap">
        <Heading>{RECIPE_BOOK.title}</Heading>
        <RecipeStudio recipes={recipes} groups={groups} />
      </div>
    </Section>
  );
}
