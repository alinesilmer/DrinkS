import { type Ref } from "react";
import { Button } from "@/components/ui/Button";
import { CategoryBar } from "@/features/shop/CategoryBar";
import { filterProducts } from "@/features/shop/filterProducts";
import { ProductCard } from "@/features/shop/ProductCard";
import { ShopToolbar } from "@/features/shop/ShopToolbar";
import { SHOP } from "@/data/shopContent";
import { type Product } from "@/types/catalog";

interface ProductGridProps {
  products: Product[];
  category: string;
  onCategory: (category: string) => void;
  query: string;
  onQuery: (query: string) => void;
  ref?: Ref<HTMLElement>;
}

/** The category tabs, the toolbar with the search, then every product that matches. */
export function ProductGrid({ products, category, onCategory, query, onQuery, ref }: ProductGridProps) {
  const shown = filterProducts(products, category, query);
  const searching = query.trim() !== "";
  const title = searching ? SHOP.results : category === SHOP.all ? SHOP.allTitle : category;

  return (
    <section ref={ref} className="shop-grid" aria-label={title}>
      <CategoryBar active={searching ? "" : category} onChange={onCategory} />
      <ShopToolbar count={shown.length} query={query} onQuery={onQuery} />
      {shown.length === 0 ? (
        <div className="shop-grid__empty">
          <p>{SHOP.search.none}</p>
          <Button variant="link" onClick={() => onQuery("")}>
            {SHOP.search.clear}
          </Button>
        </div>
      ) : (
        <div className="shop-grid__cards" role="tabpanel">
          {shown.map((p, i) => (
            <ProductCard key={`${category}-${p.id}`} product={p} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
