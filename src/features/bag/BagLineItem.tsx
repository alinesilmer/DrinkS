import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Photo } from "@/components/ui/Photo";
import { type BagLine } from "@/features/bag/bagMath";
import { useCart } from "@/context/cart/cartContext";
import { MAX_QTY } from "@/context/cart/cartReducer";
import { BAG } from "@/data/shopContent";
import { price } from "@/lib/text";

/** One product in the bag: photo, name, line price, quantity, remove. */
export function BagLineItem({ line }: { line: BagLine }) {
  const { setQty } = useCart();
  const { product, qty } = line;

  return (
    <li className="bag-line">
      <span className="bag-line__thumb">
        <Photo src={product.image} alt="" />
      </span>
      <div className="bag-line__info">
        <p className="bag-line__name">{product.name}</p>
        <p className="bag-line__size">
          {product.size} · {price(product.price)}
        </p>
        <Button variant="link" className="bag-line__remove" onClick={() => setQty(product.id, 0)}>
          {BAG.remove}
        </Button>
      </div>
      <div className="bag-line__end">
        <p className="bag-line__price">{price(product.price * qty)}</p>
        <QuantityStepper
          size="sm"
          value={qty}
          max={MAX_QTY}
          onChange={(n) => setQty(product.id, n)}
          label={`${BAG.quantity}: ${product.name}`}
          lessLabel={BAG.less}
          moreLabel={BAG.more}
        />
      </div>
    </li>
  );
}
