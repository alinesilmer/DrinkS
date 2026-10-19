import { type RefObject, useEffect, useState } from "react";

interface Options {
  /** Keep reporting after the first time it enters. Defaults to false (fire once). */
  repeat?: boolean;
  rootMargin?: string;
}

/** True once (or while, with `repeat`) the element is on screen. */
export function useInView(ref: RefObject<Element | null>, { repeat = false, rootMargin = "0px 0px -15% 0px" }: Options = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && !repeat) io.disconnect();
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, repeat, rootMargin]);

  return inView;
}
