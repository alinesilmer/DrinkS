import { type ReactNode, useCallback, useMemo, useState } from "react";
import { BagDrawerContext } from "@/context/bag/bagDrawerContext";

export function BagDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const api = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return <BagDrawerContext value={api}>{children}</BagDrawerContext>;
}
