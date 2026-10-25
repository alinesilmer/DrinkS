import { SearchInput } from "@/components/ui/SearchInput";
import { SHOP } from "@/data/shopContent";
import { plural } from "@/lib/text";

interface ShopToolbarProps {
  count: number;
  query: string;
  onQuery: (query: string) => void;
}

/** The search field. How many products match is announced to screen readers, not shown. */
export function ShopToolbar({ count, query, onQuery }: ShopToolbarProps) {
  return (
    <div className="shop-grid__head">
      <SearchInput value={query} onChange={onQuery} label={SHOP.search.label} placeholder={SHOP.search.placeholder} />
      <p className="visually-hidden" aria-live="polite">
        {plural(count, SHOP.count.one, SHOP.count.many)}
      </p>
    </div>
  );
}
