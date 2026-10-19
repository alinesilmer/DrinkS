import { type CSSProperties } from "react";

export type CssVars = Record<`--${string}`, string | number>;

/**
 * The only way components pass per-item values (index, size, colour) to the stylesheet:
 * as CSS custom properties. How those values are used lives in src/styles.
 */
export const cssVars = (vars: CssVars) => vars as CSSProperties;
