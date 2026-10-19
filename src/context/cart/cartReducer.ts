import { type ProductId } from "@/types/catalog";

/** Quantities by product id. */
export type CartLines = Record<ProductId, number>;

export type CartAction =
  | { type: "add"; ids: ProductId[] }
  | { type: "set"; id: ProductId; qty: number }
  | { type: "clear" };

export const MAX_QTY = 99;

export function cartReducer(lines: CartLines, action: CartAction): CartLines {
  switch (action.type) {
    case "add": {
      const next = { ...lines };
      action.ids.forEach((id) => {
        next[id] = Math.min(MAX_QTY, (next[id] ?? 0) + 1);
      });
      return next;
    }
    case "set": {
      // 0 (or less) takes the line out of the bag
      const next = { ...lines };
      const qty = Math.min(MAX_QTY, Math.floor(action.qty));
      if (qty > 0) next[action.id] = qty;
      else delete next[action.id];
      return next;
    }
    case "clear":
      return {};
  }
}

export const countItems = (lines: CartLines) => Object.values(lines).reduce((n, qty) => n + qty, 0);

/** Guards what comes back from storage: only small positive integers keyed by short ids. */
export function isCartLines(v: unknown): v is CartLines {
  if (typeof v !== "object" || v === null || Array.isArray(v)) return false;
  return Object.entries(v).every(
    ([id, qty]) => /^[a-z0-9-]{1,40}$/.test(id) && Number.isInteger(qty) && qty > 0 && qty <= MAX_QTY,
  );
}
