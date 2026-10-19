import { useState } from "react";
import { Notepad } from "@/features/recipes/Notepad";
import { RecipeBook } from "@/features/recipes/RecipeBook";
import { usePantry } from "@/features/recipes/usePantry";
import { type IngredientGroup, type IngredientId, type Recipe } from "@/types/catalog";

/** The notepad with what you have at home, next to the stamp album of recipes. */
export function RecipeStudio({ recipes, groups }: { recipes: Recipe[]; groups: IngredientGroup[] }) {
  const pantry = usePantry(groups);
  const [spread, setSpread] = useState(0);

  // ticking something re-ranks the stamps, so the album goes back to its first spread
  const toggle = (id: IngredientId) => {
    pantry.toggle(id);
    setSpread(0);
  };

  return (
    <div className="recipe-studio">
      <Notepad pantry={pantry} groups={groups} onToggle={toggle} />
      <RecipeBook recipes={recipes} groups={groups} have={pantry.have} spread={spread} onSpread={setSpread} />
    </div>
  );
}
