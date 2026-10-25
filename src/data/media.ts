// Every photo the site uses, in one place. Files live in /public/media
// (credits in CREDITOS.txt). Free stock for now: swap paths for your own shots.
const photo = (name: string) => `/media/photos/${name}.webp`;

/** The photo of the glass on the cover (transparent WebP, with its orange slice); the cart's empty state uses it too. */
export const GLASS_PHOTO = "/media/glass2.webp";

/** The short glass of "Mezclá" (transparent WebP, with its cherry on a pick). */
export const GLASS3_PHOTO = "/media/glass3.webp";

/** The hurricane glass of "El verano, servido" (transparent WebP, with its sugar rim and its stick of cinnamon). */
export const CUP4_PHOTO = "/media/cup4.webp";

/** The tall glass of "Elegí" and "Brindá" (transparent WebP, with its lime and its straw). */
export const CUP_PHOTO = "/media/cup.webp";

/** The decorations that float around the glasses (transparent WebP, cropped to their outline): a lime, an orange, a leaf and two ice cubes. */
export const DECOS = {
  lime: { src: "/media/deco-lime.webp", width: 1034, height: 1035 },
  orange: { src: "/media/deco-orange.webp", width: 1079, height: 1068 },
  leaf: { src: "/media/deco-leaf.webp", width: 586, height: 932 },
  ice1: { src: "/media/ice-1.webp", width: 668, height: 632 },
  ice2: { src: "/media/ice-2.webp", width: 637, height: 654 },
} as const;

/** Product photo by product id. */
export const productPhoto = (id: string) => photo(`p-${id}`);
