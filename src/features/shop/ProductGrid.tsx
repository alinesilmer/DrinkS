import { type Ref } from "react";
import { CategoryBar } from "@/features/shop/CategoryBar";
import { ProductCard } from "@/features/shop/ProductCard";
import { SHOP } from "@/data/shopContent";
import { plural } from "@/lib/text";
import { type Product } from "@/types/catalog";

interface ProductGridProps {
  products: Product[];
  category: string;
  onCategory: (category: string) => void;
  ref?: Ref<HTMLElement>;
}

/** The category tabs, a heading with the count, then every product of the chosen category. */
export function ProductGrid({ products, category, onCategory, ref }: ProductGridProps) {
  const shown = category === SHOP.all ? products : products.filter((p) => p.category === category);

  return (
    <section ref={ref} className="shop-grid" aria-label={category}>
      <CategoryBar active={category} onChange={onCategory} />
      <div className="shop-grid__head">
        <h2 className="shop-grid__title">{category === SHOP.all ? SHOP.allTitle : category}</h2>
        <p className="shop-grid__count">{plural(shown.length, SHOP.count.one, SHOP.count.many)}</p>
      </div>
      <div className="shop-grid__cards" role="tabpanel">
        {shown.map((p, i) => (
          <ProductCard key={`${category}-${p.id}`} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
