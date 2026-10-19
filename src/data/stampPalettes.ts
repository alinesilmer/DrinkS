import { type StampPalette } from "@/types/catalog";

// Background, arch and ink pairs taken from the beach palette.
const pal = (bg: string, arch: string, ink: string): StampPalette => ({ bg, arch, ink });

export const STAMP = {
  sand: pal("#F2D08A", "#F78F3F", "#D2491C"),
  pool: pal("#CFE2EE", "#8FB8D6", "#35566F"),
  vanilla: pal("#F5E9D0", "#D2491C", "#D2491C"),
  melon: pal("#F78F3F", "#F2D08A", "#FFFFFF"),
  marine: pal("#35566F", "#8FB8D6", "#F5E9D0"),
  chili: pal("#D2491C", "#F78F3F", "#F5E9D0"),
} satisfies Record<string, StampPalette>;
