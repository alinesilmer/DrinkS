import { BRAND } from "@/data/brand";

/** The DrinkS logo: cream lettering and petals on burnt orange (public/brand/logo.webp). */
export function Logo() {
  return <img className="logo" src="/brand/logo.webp" alt={BRAND.name} width={720} height={540} decoding="async" />;
}
