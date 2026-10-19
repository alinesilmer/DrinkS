import { createContext, useContext } from "react";

export interface BagDrawerApi {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const BagDrawerContext = createContext<BagDrawerApi | null>(null);

/** Opens and closes the shopping-bag panel from anywhere. */
export function useBagDrawer(): BagDrawerApi {
  const api = useContext(BagDrawerContext);
  if (!api) throw new Error("useBagDrawer must be used inside <BagDrawerProvider>");
  return api;
}
