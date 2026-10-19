// Every page address in one place. Links and routes both read from here.
export const ROUTES = {
  home: "/",
  products: "/productos",
  contact: "/contacto",
} as const;

/** The palette of each page: the same design in three colours (see styles/base/_tokens.scss). */
export const THEMES = { "/": "blue", "/productos": "orange", "/contacto": "green" } as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export const NAV_LINKS: { to: RoutePath; label: string }[] = [
  { to: ROUTES.home, label: "Inicio" },
  { to: ROUTES.products, label: "Productos" },
  { to: ROUTES.contact, label: "Contacto" },
];
