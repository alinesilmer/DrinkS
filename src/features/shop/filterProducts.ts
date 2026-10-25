import { SHOP } from "@/data/shopContent";
import { plain } from "@/lib/text";
import { type Product } from "@/types/catalog";

/**
 * What the shop shows. A search looks through every product (name, category and the note, no
 * accents, every word must match); with no search, the chosen category.
 */
export function filterProducts(products: Product[], category: string, query: string): Product[] {
  const words = plain(query).split(/\s+/).filter(Boolean);
  if (words.length > 0) {
    return products.filter((p) => {
      const text = plain(`${p.name} ${p.category} ${p.note}`);
      return words.every((w) => text.includes(w));
    });
  }
  return category === SHOP.all ? products : products.filter((p) => p.category === category);
}
