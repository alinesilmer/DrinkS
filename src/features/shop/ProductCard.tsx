import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { useCart } from "@/context/cart/cartContext";
import { MAX_QTY } from "@/context/cart/cartReducer";
import { useInView } from "@/hooks/useInView";
import { BAG, SHOP } from "@/data/shopContent";
import { cssVars } from "@/lib/cssVars";
import { cx, price } from "@/lib/text";
import { type Product } from "@/types/catalog";

interface ProductCardProps {
  product: Product;
  index: number;
}

/**
 * The usual shop card: photo, name, size, price, and a full-width "Agregar" button that becomes
 * a − n + control once the product is in the cart.
 */
export function ProductCard({ product, index }: ProductCardProps) {
  const card = useRef<HTMLElement>(null);
  const seen = useInView(card, { rootMargin: "0px 0px -8% 0px" });
  const { lines, add, setQty } = useCart();
  const qty = lines[product.id] ?? 0;

  return (
    <article ref={card} className={cx("product-card", seen && "is-in")} style={cssVars({ "--i": index % 6 })}>
      <div className="product-card__media">
        <Photo src={product.image} alt={product.name} />
      </div>
      <div className="product-card__info">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__size">{product.size}</p>
        <p className="product-card__price">{price(product.price)}</p>
      </div>
      {qty === 0 ? (
        <Button className="product-card__add" aria-label={`${SHOP.add} ${product.name}`} onClick={() => add(product.id)}>
          <Icon name="plus" />
          {SHOP.add}
        </Button>
      ) : (
        <QuantityStepper
          size="sm"
          value={qty}
          max={MAX_QTY}
          onChange={(n) => setQty(product.id, n)}
          label={`${BAG.quantity}: ${product.name}`}
          lessLabel={BAG.less}
          moreLabel={BAG.more}
        />
      )}
    </article>
  );
}
