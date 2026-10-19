import { type ReactNode, useCallback, useEffect, useMemo, useReducer } from "react";
import { CartContext, type CartApi } from "@/context/cart/cartContext";
import { cartReducer, countItems, isCartLines } from "@/context/cart/cartReducer";
import { readStored, writeStored } from "@/lib/storage";
import { type ProductId } from "@/types/catalog";

const STORAGE_KEY = "drinks:cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(cartReducer, undefined, () => readStored(STORAGE_KEY, isCartLines, {}));

  useEffect(() => writeStored(STORAGE_KEY, lines), [lines]);

  const add = useCallback((...ids: ProductId[]) => dispatch({ type: "add", ids }), []);
  const setQty = useCallback((id: ProductId, qty: number) => dispatch({ type: "set", id, qty }), []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const api = useMemo<CartApi>(
    () => ({ lines, count: countItems(lines), add, setQty, clear }),
    [lines, add, setQty, clear],
  );

  return <CartContext value={api}>{children}</CartContext>;
}
