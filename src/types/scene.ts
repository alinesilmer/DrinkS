import { type GlassKind } from "@/types/catalog";

/** What a drawn scene puts in the frame. Positions are % of the frame, sizes % of its width. */
export interface SceneItem {
  /** Centre, as % from the left. */
  x: number;
  /** Distance from the bottom, as %. */
  y: number;
  /** Width, as % of the frame. */
  w: number;
  /** Resting rotation in degrees. */
  r?: number;
  /** Where it comes from while scrolling in, as % of its own size. */
  dx?: number;
  dy?: number;
  /** Extra turn while scrolling in, in degrees. */
  spin?: number;
  /** Order of arrival: 0 first, 3 last. */
  lag?: number;
  /** Floats up and down with the scroll, in rem. */
  drift?: number;
  /** Turns steadily with the scroll, in degrees from top to bottom of the screen. */
  turn?: number;
}

export interface SceneGlass extends SceneItem {
  kind: GlassKind;
  /** Top liquid, bottom liquid, garnish. */
  colors: [string, string, string];
}

export interface SceneBit extends SceneItem {
  kind: "ice" | "mint" | "slice" | "spark";
  /** Colour of a slice; sparks use the text colour. */
  color?: string;
}

export interface Scene {
  glasses: SceneGlass[];
  bits: SceneBit[];
}
