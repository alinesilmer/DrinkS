export type ProductId = string;
export type IngredientId = string;

export interface Product {
  id: ProductId;
  name: string;
  category: string;
  size: string;
  /** Price in whole currency units. */
  price: number;
  /** Photo path under /public. */
  image: string;
  /** A few words that sell it: "Suave, para mojitos". */
  note: string;
}

export interface Category {
  /** Same text as Product.category. */
  name: string;
  /** One word for the category bar. */
  short: string;
  /** Product whose photo stands for the category in the category bar. */
  cover: ProductId;
}

export interface Ingredient {
  id: IngredientId;
  label: string;
  /** Product that covers this ingredient, when the shop sells it. */
  productId?: ProductId;
}

export interface IngredientGroup {
  title: string;
  /** One-word name for the tab. */
  short: string;
  items: Ingredient[];
}

export type GlassKind = "coupe" | "high" | "wine" | "hurricane" | "rocks";

/** Background, arch and ink colours of a recipe stamp. */
export interface StampPalette {
  bg: string;
  arch: string;
  ink: string;
}

export interface Recipe {
  id: string;
  name: string;
  glassLabel: string;
  minutes: number;
  glass: GlassKind;
  palette: StampPalette;
  /** Liquid top layer, bottom layer and citrus garnish. */
  colors: { top: string; bottom: string; garnish: string };
  needs: IngredientId[];
  steps: string[];
}
