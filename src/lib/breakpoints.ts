/** The tablet breakpoint of the stylesheets, in px, read from the --bp-tablet token (one source: abstracts/_mixins.scss). */
const tabletPx = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--bp-tablet")) || 820;

/** True when the window is wider than the tablet breakpoint: the side of `m.tablet` where the pages sit side by side. */
export const isWiderThanTablet = () => matchMedia(`(min-width: ${tabletPx() + 0.02}px)`).matches;
