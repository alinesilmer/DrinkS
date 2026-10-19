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
 * One recipe as a magazine spread: title, a small label and the ingredients on the left page;
 * the big stamp, the steps and a button to buy what is missing on the framed right page.
 */
export function RecipeDetail({ recipe, have, missing, buyable, ingredients, onBack }: RecipeDetailProps) {
  const { add } = useCart();
  const [added, flashAdded] = useFlash(1100);

  const buy = () => {
    add(...buyable);
    flashAdded();
  };

  return (
    <>
      <div className="book__page book__page--left recipe-detail recipe-detail--left">
        <Button variant="link" onClick={onBack}>
          {RECIPE_BOOK.back}
        </Button>
        <h3 className="book__title">{recipe.name}</h3>
        <p className="recipe-detail__meta">
          {recipe.glassLabel} · {recipe.minutes} min
        </p>
        <div className="recipe-detail__needs">
          <h4 className="book__subtitle">{RECIPE_BOOK.ingredients}</h4>
          <ul className="check-list">
            {recipe.needs.map((id) => (
              <CheckItem key={id} checked={have.has(id)} note={have.has(id) ? undefined : RECIPE_BOOK.missing}>
                {ingredients.get(id)?.label ?? id}
              </CheckItem>
            ))}
          </ul>
        </div>
      </div>

      <div className="book__page book__page--right book__page--framed recipe-detail">
        <div className="recipe-detail__figure">
          <RecipeStamp recipe={recipe} large />
        </div>
        <h4 className="book__subtitle">{RECIPE_BOOK.steps}</h4>
        <ol className="recipe-detail__steps">
          {recipe.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        {missing.length === 0 && <p className="recipe-detail__ready">{RECIPE_BOOK.allSet}</p>}
        {missing.length > 0 && buyable.length === 0 && <p className="book__empty">{RECIPE_BOOK.notSold}</p>}
        {buyable.length > 0 && (
          <Button variant="primary" disabled={added} onClick={buy}>
            {added ? RECIPE_BOOK.added : plural(buyable.length, RECIPE_BOOK.buyOne, RECIPE_BOOK.buyMany)}
          </Button>
        )}
      </div>
    </>
  );
}
