import { type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { cx } from "@/lib/text";

interface CheckItemProps {
  checked: boolean;
  children: ReactNode;
  /** When given, the row is a toggle; otherwise it is a read-only ticked line. */
  onToggle?: () => void;
  /** Small note at the end of the row, e.g. "te falta". */
  note?: string;
}

/** A ticked row. Renders inside a <li> so lists stay semantic. */
export function CheckItem({ checked, children, onToggle, note }: CheckItemProps) {
  const body = (
    <>
      <span className="check__box" aria-hidden="true" />
      {children}
      {note && <em className="check__note">{note}</em>}
    </>
  );

  return (
    <li>
      {onToggle ? (
        <Button className={cx("check", checked && "is-on")} aria-pressed={checked} onClick={onToggle}>
          {body}
        </Button>
      ) : (
        <span className={cx("check", checked && "is-on")}>{body}</span>
      )}
    </li>
  );
}
