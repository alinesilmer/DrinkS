import { type CartLines } from "@/context/cart/cartReducer";
import { type Product } from "@/types/catalog";

export interface BagLine {
  product: Product;
  qty: number;
}

export interface BagTotals {
  subtotal: number;
  delivery: number;
  total: number;
  /** How much more is needed for free delivery (0 when it already is). */
  toFree: number;
  /** 0 → 1 progress toward free delivery. */
  progress: number;
}

/** Bag lines in the order the products were added, skipping ids the catalogue no longer has. */
export function bagLines(lines: CartLines, products: Product[]): BagLine[] {
  const byId = new Map(products.map((p) => [p.id, p]));
  return Object.entries(lines).flatMap(([id, qty]) => {
    const product = byId.get(id);
    return product ? [{ product, qty }] : [];
  });
}

export function bagTotals(lines: BagLine[], rule: { fee: number; freeFrom: number }): BagTotals {
  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const free = subtotal >= rule.freeFrom;
  const delivery = subtotal === 0 || free ? 0 : rule.fee;
  return {
    subtotal,
    delivery,
    total: subtotal + delivery,
    toFree: free ? 0 : rule.freeFrom - subtotal,
    progress: Math.min(1, subtotal / rule.freeFrom),
  };
}
