import { Button } from "@/components/ui/Button";
import { CheckItem } from "@/components/ui/CheckItem";
import { RecipeStamp } from "@/features/recipes/RecipeStamp";
import { useCart } from "@/context/cart/cartContext";
import { useFlash } from "@/hooks/useFlash";
import { plural } from "@/lib/text";
import { RECIPE_BOOK } from "@/data/content";
import { type Ingredient, type IngredientId, type ProductId, type Recipe } from "@/types/catalog";

interface RecipeDetailProps {
  recipe: Recipe;
  have: ReadonlySet<IngredientId>;
  missing: IngredientId[];
  /** Shop products covering what is missing. */
  buyable: ProductId[];
  ingredients: Map<IngredientId, Ingredient>;
  onBack: () => void;
}

/**
 * One recipe on a pad of paper: a cardboard top with the way back, the stamp and the buy button
 * in a side strip, and the title, the ticked ingredients and the steps on ruled lines.
 */
export function RecipeDetail({ recipe, have, missing, buyable, ingredients, onBack }: RecipeDetailProps) {
  const { add } = useCart();
  const [added, flashAdded] = useFlash(1100);

  const buy = () => {
    add(...buyable);
    flashAdded();
  };

  return (
    <article className="sheet">
      <div className="sheet__paper">
        <Button variant="link" className="sheet__back" onClick={onBack}>
          {RECIPE_BOOK.back}
        </Button>
        <h3 className="sheet__title">{recipe.name}</h3>
        <div className="sheet__stamp">
          <RecipeStamp recipe={recipe} large />
        </div>
        <section className="sheet__needs">
          <h4 className="sheet__label">{RECIPE_BOOK.ingredients}</h4>
          <ul className="check-list">
            {recipe.needs.map((id) => (
              <CheckItem key={id} checked={have.has(id)} note={have.has(id) ? undefined : RECIPE_BOOK.missing}>
                {ingredients.get(id)?.label ?? id}
              </CheckItem>
            ))}
          </ul>
        </section>
        <section className="sheet__steps">
          <h4 className="sheet__label">{RECIPE_BOOK.steps}</h4>
          <ol className="sheet__list">
            {recipe.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
        <div className="sheet__action">
          {missing.length === 0 && <p className="sheet__ready">{RECIPE_BOOK.allSet}</p>}
          {missing.length > 0 && buyable.length === 0 && <p className="sheet__note">{RECIPE_BOOK.notSold}</p>}
          {buyable.length > 0 && (
            <Button variant="primary" disabled={added} onClick={buy}>
              {added ? RECIPE_BOOK.added : plural(buyable.length, RECIPE_BOOK.buyOne, RECIPE_BOOK.buyMany)}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
