/** Lower-case and strip accents, so "pina" finds "Piña". */
export const plain = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/** Joins class names, skipping falsy ones. */
export const cx = (...names: (string | false | null | undefined)[]) => names.filter(Boolean).join(" ");

/** Typographic minus for negative numbers. */
export const signed = (n: number) => String(n).replace("-", "−");

// Argentine pesos, as people write them: $12.900 (dot between thousands, no decimals).
const PESOS = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 });
export const price = (n: number) => `$${PESOS.format(n)}`;

/** "1 lo que falta" / "los 3 que faltan" style plurals. */
export const plural = (n: number, one: string, many: string) => (n === 1 ? one : many.replace("#", String(n)));
