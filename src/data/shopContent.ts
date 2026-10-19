// Copy for the shop page and the bag. Few, strong words.
import { DELIVERY } from "@/data/delivery";
import { SCENES } from "@/data/homeScenes";
import { price } from "@/lib/text";

export const SHOP = {
  kicker: "La tienda",
  title: "Todo para tu bar en casa",
  promo: { word: "Envío gratis", line: `En pedidos desde ${price(DELIVERY.freeFrom)}. Hielo siempre de regalo.`, scene: SCENES.choose, tone: "burnt" as const },
  all: "Todo",
  allTitle: "Todo el bar",
  count: { one: "1 producto", many: "# productos" },
  add: "Agregar",
  filter: "Categorías",
};

export const BAG = {
  title: "Tu carrito",
  open: "Abrir el carrito",
  close: "Cerrar",
  empty: "Tu carrito está vacío.",
  emptyCta: "Ver productos",
  remove: "Quitar",
  subtotal: "Subtotal",
  delivery: "Envío",
  free: "Gratis",
  total: "Total",
  checkout: "Pedir ahora",
  keepShopping: "Seguir comprando",
  checkoutSoon: "Muy pronto vas a poder pagar acá.",
  /** "$12 más y el envío es gratis" */
  toFree: (amount: string) => `${amount} más y el envío es gratis`,
  freeReached: "¡Tu envío es gratis!",
  quantity: "Cantidad",
  less: "Uno menos",
  more: "Uno más",
};
