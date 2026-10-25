import { useMemo } from "react";
import { AsyncContent } from "@/components/ui/AsyncContent";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { BagLineItem } from "@/features/bag/BagLineItem";
import { BagSummary } from "@/features/bag/BagSummary";
import { bagLines, bagTotals } from "@/features/bag/bagMath";
import { useBagDrawer } from "@/context/bag/bagDrawerContext";
import { useCart } from "@/context/cart/cartContext";
import { useAsync } from "@/hooks/useAsync";
import { catalogService } from "@/services/catalogService";
import { ROUTES } from "@/app/routes";
import { DELIVERY } from "@/data/delivery";
import { GLASS_PHOTO } from "@/data/media";
import { BAG } from "@/data/shopContent";
import { type Product } from "@/types/catalog";

/** The cart: a ticket from the right, cobalt stripes on top and what the visitor picked in cream below. */
export function BagDrawer() {
  const { isOpen, close } = useBagDrawer();
  const products = useAsync(catalogService.getProducts);

  return (
    <Drawer open={isOpen} onClose={close} label={BAG.title}>
      <header className="drawer__head">
        <h2 className="drawer__title">{BAG.title}</h2>
        <Button variant="icon" aria-label={BAG.close} onClick={close}>
          <Icon name="close" />
        </Button>
      </header>
      <AsyncContent state={products}>{(data) => <BagContents products={data} onClose={close} />}</AsyncContent>
    </Drawer>
  );
}

function BagContents({ products, onClose }: { products: Product[]; onClose: () => void }) {
  const { lines } = useCart();
  const items = useMemo(() => bagLines(lines, products), [lines, products]);

  if (items.length === 0) {
    return (
      <div className="bag__empty">
        <Photo src={GLASS_PHOTO} alt="" className="bag__empty-art" />
        <p>{BAG.empty}</p>
        <ButtonLink variant="primary" href={ROUTES.products} onClick={onClose}>
          {BAG.emptyCta}
        </ButtonLink>
      </div>
    );
  }

  return (
    <>
      <ul className="bag__lines">
        {items.map((line) => (
          <BagLineItem key={line.product.id} line={line} />
        ))}
      </ul>
      <BagSummary totals={bagTotals(items, DELIVERY)} onKeepShopping={onClose} />
    </>
  );
}
