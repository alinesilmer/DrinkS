export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/** 0 → 1 as `p` moves from `a` to `b`. */
export const span = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

/** Smoothstep easing. */
export const ease = (t: number) => t * t * (3 - 2 * t);

/** Deterministic pseudo-random spread, so decorations are stable between renders. */
export const spread = (i: number, mul: number, add: number, mod: number) => (i * mul + add) % mod;
