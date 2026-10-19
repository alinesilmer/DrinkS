import { type RefObject, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollFrame } from "@/hooks/useScrollFrame";
import { ease, span } from "@/lib/math";
import { passProgress } from "@/lib/scroll";

interface ScrollVarsOptions {
  /** Scroll range (0 → 1 of the pass) over which --p goes 0 → 1. Used when `playFor` is not set. */
  window?: [number, number];
  /** Instead of following the scroll, play --p over this many ms each time the element comes into view. */
  playFor?: number;
}

/**
 * Writes two CSS variables on the element, straight to the DOM (no React re-render):
 *   --t  0 → 1  the element travels up the screen
 *   --p  0 → 1  it "arrives": scrubbed by the scroll, or played once on entering the screen
 * Playing in time means the animation is seen even when a link jumps straight to the element.
 */
export function useScrollVars(ref: RefObject<HTMLElement | null>, { window = [0.08, 0.42], playFor }: ScrollVarsOptions = {}) {
  const reduced = useReducedMotion();
  const play = useRef({ start: 0, frame: 0, shown: false });

  const set = (el: HTMLElement, name: string, value: number) => el.style.setProperty(name, value.toFixed(3));

  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const t = reduced ? 0.5 : passProgress(el);
    set(el, "--t", t);

    if (reduced) return set(el, "--p", 1);
    if (playFor === undefined) return set(el, "--p", ease(span(t, window[0], window[1])));

    const state = play.current;
    const inView = t > 0.03 && t < 0.97;
    if (inView && !state.shown) {
      state.shown = true;
      state.start = performance.now();
      const tick = (now: number) => {
        set(el, "--p", ease(span(now - state.start, 0, playFor)));
        if (now - state.start < playFor && state.shown) state.frame = requestAnimationFrame(tick);
      };
      state.frame = requestAnimationFrame(tick);
    } else if (!inView && state.shown) {
      // out of sight: rewind, so it plays again next time
      state.shown = false;
      cancelAnimationFrame(state.frame);
      set(el, "--p", 0);
    }
  });
}
