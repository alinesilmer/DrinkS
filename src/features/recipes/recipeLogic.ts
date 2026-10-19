import { plain } from "@/lib/text";
import { type Ingredient, type IngredientGroup, type IngredientId, type ProductId, type Recipe } from "@/types/catalog";

export type Pantry = ReadonlySet<IngredientId>;

export interface RankedRecipe {
  recipe: Recipe;
  missing: IngredientId[];
}

export const missingFor = (recipe: Recipe, have: Pantry) => recipe.needs.filter((id) => !have.has(id));

/** Recipes you can make first, then the ones that are closest. */
export function rankRecipes(recipes: Recipe[], have: Pantry): RankedRecipe[] {
  return recipes
    .map((recipe) => ({ recipe, missing: missingFor(recipe, have) }))
    .sort((a, b) => a.missing.length - b.missing.length);
}

/** Groups filtered to the ingredients whose name contains the query (accent-insensitive). */
export function filterGroups(groups: IngredientGroup[], query: string): IngredientGroup[] {
  const q = plain(query.trim());
  if (!q) return groups;
  return groups
    .map((g) => ({ ...g, items: g.items.filter((i) => plain(i.label).includes(q)) }))
    .filter((g) => g.items.length > 0);
}

export const indexIngredients = (groups: IngredientGroup[]) =>
  new Map<IngredientId, Ingredient>(groups.flatMap((g) => g.items.map((i) => [i.id, i] as const)));

/** Shop products that cover the missing ingredients (some, like salt, are not sold). */
export function productsFor(missing: IngredientId[], ingredients: Map<IngredientId, Ingredient>): ProductId[] {
  return missing.flatMap((id) => {
    const productId = ingredients.get(id)?.productId;
    return productId ? [productId] : [];
  });
}
