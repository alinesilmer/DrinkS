import { useRef, useState } from "react";
import { ColorBand } from "@/components/ui/ColorBand";
import { CocktailScene } from "@/features/home/CocktailScene";
import { ProductGrid } from "@/features/shop/ProductGrid";
import { ShopHero } from "@/features/shop/ShopHero";
import { SHOP } from "@/data/shopContent";
import { type Product } from "@/types/catalog";

/** Productos: a video header, the photo category bar and the products, then a promo band. */
export function Shop({ products }: { products: Product[] }) {
  const [category, setCategory] = useState(SHOP.all);
  const grid = useRef<HTMLElement>(null);

  const choose = (name: string) => {
    setCategory(name);
    // bring the first products into view if the bar is already stuck at the top
    if (grid.current && grid.current.getBoundingClientRect().top < 0) {
      grid.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="shop">
      <ShopHero />
      <div className="shop__body">
        <div className="wrap">
          <ProductGrid ref={grid} products={products} category={category} onCategory={choose} />
        </div>
      </div>
      <div className="shop__promo">
        <ColorBand word={SHOP.promo.word} line={SHOP.promo.line} tone={SHOP.promo.tone}>
          <CocktailScene scene={SHOP.promo.scene} />
        </ColorBand>
      </div>
    </div>
  );
}
