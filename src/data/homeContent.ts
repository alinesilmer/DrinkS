import { SCENES } from "@/data/homeScenes";

// Copy and media for Inicio. Few strong words; the photos do the talking.
export const HOME_HERO = {
  /** The headline, split to sit on either side of the glass. */
  left: "Bebidas bien frías,",
  right: "a tu puerta",
  cta: "Ver productos",
};

/** Tilted colour bands, like a summer poster: word, line, drawn cocktail scene, colour. */
export const BANDS = [
  { word: "Elegí", line: "Destilados, gaseosas, fruta y hielo.", scene: SCENES.choose, tone: "burnt" },
  { word: "Mezclá", line: "Recetas fáciles con lo que ya tenés.", scene: SCENES.mix, tone: "peach" },
  { word: "Brindá", line: "Llega bien frío. Vos solo servís.", scene: SCENES.toast, tone: "orange" },
] as const;

/** "Por qué DrinkS": the three promises, each beside a layer of the glass. */
export const MOSAIC = {
  eyebrow: "Por qué DrinkS",
  title: "El verano, servido",
  promises: [
    { big: "−4", unit: "°C", title: "al llegar", text: "Viaja en frío, abrí y serví." },
    { big: "45", unit: "min", title: "a tu puerta", text: "De 12 a 21 h, todos los días." },
    { big: "2", unit: "kg", title: "de hielo gratis", text: "En cada pedido, siempre." },
  ],
} as const;

export const NIGHT = {
  line: "La noche pide hielo",
  cta: "Pedir ahora",
};
