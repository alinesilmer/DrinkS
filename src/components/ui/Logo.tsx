import { BRAND } from "@/data/brand";

/** The DrinkS wordmark (public/brand): white on the dark bars and stripes, black on paper. */
export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  return <img className="logo" src={`/brand/logo-${tone}.webp`} alt={BRAND.name} width={360} height={119} decoding="async" />;
}
