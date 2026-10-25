import { useRef, useState } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { ProductGrid } from "@/features/shop/ProductGrid";
import { SHOP } from "@/data/shopContent";
import { type Product } from "@/types/catalog";

/** Productos: the header, the category tabs and the products, then the footer. */
export function Shop({ products }: { products: Product[] }) {
  const [category, setCategory] = useState(SHOP.all);
  const [query, setQuery] = useState("");
  const grid = useRef<HTMLElement>(null);

  const choose = (name: string) => {
    setCategory(name);
    setQuery("");
    // bring the first products into view if the bar is already stuck at the top
    if (grid.current && grid.current.getBoundingClientRect().top < 0) {
      grid.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="shop">
      <PageHero kicker={SHOP.kicker} title={SHOP.title} script={SHOP.script} />
      <div className="shop__body">
        <div className="wrap wrap--wide">
          <ProductGrid
            ref={grid}
            products={products}
            category={category}
            onCategory={choose}
            query={query}
            onQuery={setQuery}
          />
        </div>
      </div>
    </div>
  );
}
