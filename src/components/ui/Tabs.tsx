import { Button } from "@/components/ui/Button";
import { cx } from "@/lib/text";

export interface TabItem {
  id: string;
  label: string;
  /** Shows a small dot (e.g. "something in here is selected"). */
  marked?: boolean;
}

interface TabsProps {
  items: TabItem[];
  active: string;
  onChange: (id: string) => void;
  label: string;
}

/** Plain text tabs; the active one gets a small dot underneath. */
export function Tabs({ items, active, onChange, label }: TabsProps) {
  return (
    <div className="tabs" role="tablist" aria-label={label}>
      {items.map((t) => (
        <Button
          key={t.id}
          role="tab"
          aria-selected={t.id === active}
          className={cx("tabs__tab", t.marked && "is-marked")}
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </Button>
      ))}
    </div>
  );
}
