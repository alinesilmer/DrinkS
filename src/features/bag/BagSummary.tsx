import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { type BagTotals } from "@/features/bag/bagMath";
import { cssVars } from "@/lib/cssVars";
import { price } from "@/lib/text";
import { BAG } from "@/data/shopContent";

/** Free-delivery progress, the totals, and the order button. */
export function BagSummary({ totals, onKeepShopping }: { totals: BagTotals; onKeepShopping: () => void }) {
  const [checkoutNote, setCheckoutNote] = useState(false);

  return (
    <footer className="bag-summary">
      <div className="bag-summary__free">
        <p>{totals.toFree > 0 ? BAG.toFree(price(totals.toFree)) : BAG.freeReached}</p>
        <span className="bag-summary__bar" style={cssVars({ "--progress": totals.progress })} aria-hidden="true" />
      </div>
      <dl className="bag-summary__rows">
        <dt>{BAG.subtotal}</dt>
        <dd>{price(totals.subtotal)}</dd>
        <dt>{BAG.delivery}</dt>
        <dd>{totals.delivery === 0 ? BAG.free : price(totals.delivery)}</dd>
        <dt className="bag-summary__total">{BAG.total}</dt>
        <dd className="bag-summary__total">{price(totals.total)}</dd>
      </dl>
      <Button variant="primary" className="bag-summary__checkout" onClick={() => setCheckoutNote(true)}>
        {BAG.checkout}
      </Button>
      <p className="bag-summary__note" role="status">
        {checkoutNote && BAG.checkoutSoon}
      </p>
      <Button variant="link" className="bag-summary__keep" onClick={onKeepShopping}>
        {BAG.keepShopping}
      </Button>
    </footer>
  );
}
