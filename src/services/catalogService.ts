import { PRODUCTS } from "@/data/products";
import { INGREDIENT_GROUPS } from "@/data/ingredients";
import { RECIPES } from "@/data/recipes";
import { respond } from "@/services/mockApi";
import { type IngredientGroup, type Product, type Recipe } from "@/types/catalog";

/**
 * The only door to catalogue data. Today it resolves mock data; when the backend exists,
 * swap each body for a `fetch` and keep the signatures, so no component has to change.
 */
export interface RecipeBookData {
  recipes: Recipe[];
  ingredientGroups: IngredientGroup[];
}

// Products are asked for by the shop page and the bag: one request, shared.
let products: Promise<Product[]> | undefined;

export const catalogService = {
  getProducts: (): Promise<Product[]> => {
    products ??= respond(PRODUCTS).catch((e: unknown) => {
      products = undefined; // a failed request can be retried
      throw e;
    });
    return products;
  },
  getIngredientGroups: (): Promise<IngredientGroup[]> => respond(INGREDIENT_GROUPS),
  getRecipes: (): Promise<Recipe[]> => respond(RECIPES),
};

export async function getRecipeBook(): Promise<RecipeBookData> {
  const [recipes, ingredientGroups] = await Promise.all([
    catalogService.getRecipes(),
    catalogService.getIngredientGroups(),
  ]);
  return { recipes, ingredientGroups };
}
