import { useCallback, useEffect, useRef, useState } from "react";

/** A flag that turns on for `ms` and then off again: "Agregado ✓" feedback, page turns. */
export function useFlash(ms: number): [boolean, () => void] {
  const [on, setOn] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const trigger = useCallback(() => {
    window.clearTimeout(timer.current);
    // off first, then on in the next frame, so a CSS animation restarts on repeat triggers
    setOn(false);
    requestAnimationFrame(() => setOn(true));
    timer.current = window.setTimeout(() => setOn(false), ms);
  }, [ms]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return [on, trigger];
}
