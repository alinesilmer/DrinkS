import { type Category } from "@/types/catalog";

// Shop categories, in the order they appear. `name` matches Product.category; `cover` is
// the product whose photo stands for the category.
export const CATEGORIES: Category[] = [
  { name: "Destilados", short: "Destilados", cover: "ron" },
  { name: "Licores y vinos", short: "Licores", cover: "aperitivo" },
  { name: "Gaseosas", short: "Gaseosas", cover: "tonica" },
  { name: "Jarabes y frutas", short: "Frutas", cover: "lima" },
  { name: "Hielo y adornos", short: "Hielo", cover: "hielo" },
];
