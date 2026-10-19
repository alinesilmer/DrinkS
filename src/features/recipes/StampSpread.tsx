import { RecipeStamp } from "@/features/recipes/RecipeStamp";
import { type RankedRecipe } from "@/features/recipes/recipeLogic";
import { type Recipe } from "@/types/catalog";

interface StampSpreadProps {
  left: RankedRecipe[];
  right: RankedRecipe[];
  /** Stamp slots on every page; unused slots stay as empty frames, like a real album. */
  perPage: number;
  /** Any recipe: drawn invisibly in empty slots so they are exactly as tall as a stamp. */
  ghost?: Recipe;
  onOpen: (recipeId: string) => void;
}

/** Two pages of the stamp album: stamps in a thin frame. */
export function StampSpread({ left, right, perPage, ghost, onOpen }: StampSpreadProps) {
  const page = (items: RankedRecipe[], side: "left" | "right") => (
    <div className={`book__page book__page--${side} book__page--framed album`}>
      {Array.from({ length: perPage }, (_, i) => {
        const item = items[i];
        return item ? (
          <div key={item.recipe.id} className="album__slot">
            <RecipeStamp recipe={item.recipe} onOpen={() => onOpen(item.recipe.id)} />
          </div>
        ) : (
          <div key={`empty-${i}`} className="album__slot album__slot--empty" aria-hidden="true">
            {ghost && <RecipeStamp recipe={ghost} />}
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {page(left, "left")}
      {page(right, "right")}
    </>
  );
}
