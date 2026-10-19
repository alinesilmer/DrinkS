import { Button } from "@/components/ui/Button";
import { cx } from "@/lib/text";

interface PagerProps {
  page: number;
  pages: number;
  onChange: (page: number) => void;
  label: string;
}

export function Pager({ page, pages, onChange, label }: PagerProps) {
  if (pages <= 1) return null;
  return (
    <nav className="pager" aria-label={label}>
      <Button variant="round" aria-label="Anterior" disabled={page === 0} onClick={() => onChange(page - 1)}>
        ‹
      </Button>
      <span className="pager__dots" aria-live="polite">
        <span className="visually-hidden">
          Página {page + 1} de {pages}
        </span>
        {Array.from({ length: pages }, (_, n) => (
          <i key={n} className={cx("pager__dot", n === page && "is-on")} aria-hidden="true" />
        ))}
      </span>
      <Button variant="round" aria-label="Siguiente" disabled={page >= pages - 1} onClick={() => onChange(page + 1)}>
        ›
      </Button>
    </nav>
  );
}
