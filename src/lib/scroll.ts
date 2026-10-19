import { clamp } from "@/lib/math";

type Listener = () => void;

// One passive scroll/resize listener for the whole app, throttled to one run per frame.
const listeners = new Set<Listener>();
let queued = false;

const flush = () => {
  queued = false;
  listeners.forEach((fn) => fn());
};

const request = () => {
  if (queued) return;
  queued = true;
  requestAnimationFrame(flush);
};

export function subscribeScroll(fn: Listener): () => void {
  if (!listeners.size) {
    addEventListener("scroll", request, { passive: true });
    addEventListener("resize", request, { passive: true });
  }
  listeners.add(fn);
  fn();
  return () => {
    listeners.delete(fn);
    if (!listeners.size) {
      removeEventListener("scroll", request);
      removeEventListener("resize", request);
    }
  };
}

/** 0 → 1 while a tall section with a sticky child is pinned. */
export function pinnedProgress(el: Element): number {
  const r = el.getBoundingClientRect();
  const travel = r.height - innerHeight;
  return travel > 0 ? clamp(-r.top / travel) : 0;
}

/** 0 when the element enters at the bottom of the viewport, 1 when it leaves at the top. */
export function passProgress(el: Element): number {
  const r = el.getBoundingClientRect();
  return clamp((innerHeight - r.top) / (innerHeight + r.height));
}
