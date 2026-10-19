import { useEffect, useRef } from "react";
import { subscribeScroll } from "@/lib/scroll";

/**
 * Runs `onFrame` once per animation frame while the page scrolls or resizes.
 * The callback should write to DOM refs directly: re-rendering React on every
 * scroll frame would be far too slow.
 */
export function useScrollFrame(onFrame: () => void): void {
  const latest = useRef(onFrame);

  useEffect(() => {
    latest.current = onFrame;
  });

  useEffect(() => subscribeScroll(() => latest.current()), []);
}
