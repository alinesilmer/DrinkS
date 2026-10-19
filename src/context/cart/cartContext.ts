import { createContext, useContext } from "react";
import { type CartLines } from "@/context/cart/cartReducer";
import { type ProductId } from "@/types/catalog";

export interface CartApi {
  /** Quantity by product id. */
  lines: CartLines;
  /** Total number of items. */
  count: number;
  /** Adds one of each id. */
  add: (...ids: ProductId[]) => void;
  /** Sets an exact quantity; 0 removes the product. */
  setQty: (id: ProductId, qty: number) => void;
  clear: () => void;
}

export const CartContext = createContext<CartApi | null>(null);

export function useCart(): CartApi {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart must be used inside <CartProvider>");
  return cart;
}
