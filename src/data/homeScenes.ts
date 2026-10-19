import { type Scene } from "@/types/scene";

// The three drawn cocktail scenes of Inicio (Elige · Mezcla · Brinda). The glasses are the same
// drawings as the recipe stamps; every number is explained in types/scene.ts.

/** Three glasses rise one after another while ice, citrus and mint fall in front of them. */
const CHOOSE: Scene = {
  glasses: [
    { kind: "rocks", colors: ["#F2D08A", "#F78F3F", "#F5C244"], x: 22, y: 6, w: 30, dy: 70, spin: -8, lag: 0 },
    { kind: "high", colors: ["var(--pop-light)", "var(--pop)", "#F5C244"], x: 50, y: 6, w: 34, dy: 70, spin: 6, lag: 1 },
    { kind: "coupe", colors: ["#F5E9D0", "#F2D08A", "#F5C244"], x: 78, y: 6, w: 30, dy: 70, spin: -6, lag: 2 },
  ],
  bits: [
    { kind: "slice", color: "#F5C244", x: 11, y: 1, w: 11, r: -10, dy: -950, spin: 160, lag: 0 },
    { kind: "ice", x: 36, y: 1, w: 10, r: -12, dy: -950, spin: 120, lag: 1 },
    { kind: "ice", x: 63, y: 0, w: 9, r: 14, dy: -1050, spin: -90, lag: 2 },
    { kind: "mint", x: 90, y: 2, w: 10, r: 30, dy: -950, spin: 200, lag: 3 },
  ],
};

/** A mojito sways with the scroll; mint, lime and ice drift and turn around it. */
const MIX: Scene = {
  glasses: [
    { kind: "high", colors: ["#DDEFC8", "#9CCB86", "#3E7F58"], x: 50, y: 4, w: 44, dy: 50, spin: 4, turn: 40 },
  ],
  bits: [
    { kind: "mint", x: 20, y: 56, w: 13, r: -30, dx: -220, dy: -60, spin: -180, lag: 1, drift: 3, turn: 120 },
    { kind: "mint", x: 80, y: 63, w: 12, r: 40, dx: 220, dy: -50, spin: 160, lag: 2, drift: -3, turn: -140 },
    { kind: "slice", color: "#7FBF6A", x: 14, y: 20, w: 15, dx: -220, spin: -120, lag: 2, drift: 2, turn: 90 },
    { kind: "ice", x: 86, y: 28, w: 11, r: 18, dx: 220, dy: 100, spin: 90, lag: 1, drift: -2, turn: -60 },
  ],
};

/** Two coupes slide together and clink; sparkles pop where the rims meet. */
const TOAST: Scene = {
  glasses: [
    { kind: "coupe", colors: ["#F5E9D0", "#F2D08A", "#D2491C"], x: 34, y: 12, w: 36, r: 9, dx: -110, spin: -26, lag: 0 },
    { kind: "coupe", colors: ["var(--pop-light)", "var(--pop)", "#F5E9D0"], x: 66, y: 12, w: 36, r: -9, dx: 110, spin: 26, lag: 0 },
  ],
  bits: [
    { kind: "spark", x: 50, y: 76, w: 11, spin: 90, lag: 3 },
    { kind: "spark", x: 39, y: 87, w: 6, spin: -90, lag: 3 },
    { kind: "spark", x: 61, y: 88, w: 7, spin: 90, lag: 3 },
  ],
};

export const SCENES = { choose: CHOOSE, mix: MIX, toast: TOAST } as const;
