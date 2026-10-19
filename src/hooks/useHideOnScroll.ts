import { useRef, useState } from "react";
import { useScrollFrame } from "@/hooks/useScrollFrame";

/** True while the visitor scrolls down (past `offset`); false as soon as they scroll back up. */
export function useHideOnScroll(offset = 120, tolerance = 6): boolean {
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  useScrollFrame(() => {
    const y = scrollY;
    const delta = y - last.current;
    if (Math.abs(delta) < tolerance) return;
    setHidden(y > offset && delta > 0);
    last.current = y;
  });

  return hidden;
}
