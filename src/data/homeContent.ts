// Copy and media for Inicio. Few strong words; the photos do the talking.
export const HOME_HERO = {
  kicker: "Armá tu trago",
  /** The headline in wide capitals, and the cursive line under it. */
  title: "Bebidas bien frías",
  script: "a tu puerta",
  /** Two short notes, one on each side of the glass. */
  leftNote: "Destilados, gaseosas, fruta y hielo",
  rightNote: "Hielo siempre de regalo",
};

/** The three screens of the scroll: the word, and the colour of the drink in the glass while it is on. */
export const BANDS = [
  { word: "Elegí", drink: "#f78f3f" },
  { word: "Mezclá", drink: "#b794f4" },
  { word: "Brindá", drink: "#f26b8a" },
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
