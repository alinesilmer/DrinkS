import { Button } from "@/components/ui/Button";
import { CATEGORIES } from "@/data/categories";
import { SHOP } from "@/data/shopContent";
import { cx } from "@/lib/text";

interface CategoryBarProps {
  active: string;
  onChange: (category: string) => void;
}

const ITEMS = [{ id: SHOP.all, label: SHOP.all }, ...CATEGORIES.map((c) => ({ id: c.name, label: c.short }))];

/** Sticky row of plain text tabs, one per category; the chosen one is orange with a dot. */
export function CategoryBar({ active, onChange }: CategoryBarProps) {
  return (
    <div className="category-bar" role="tablist" aria-label={SHOP.filter}>
      {ITEMS.map((item) => (
        <Button
          key={item.id}
          role="tab"
          aria-selected={item.id === active}
          className={cx("category-bar__item", item.id === active && "is-active")}
          onClick={() => onChange(item.id)}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
}
