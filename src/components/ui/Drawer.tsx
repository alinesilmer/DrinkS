import { type ReactNode, useEffect, useRef } from "react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  /** Accessible name of the panel. */
  label: string;
  children: ReactNode;
}

/**
 * A panel that slides in from the right, built on the native <dialog>: the browser handles
 * the focus trap, Esc to close, and hiding the page behind it from screen readers.
 */
export function Drawer({ open, onClose, label, children }: DrawerProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={dialog}
      className="drawer"
      aria-label={label}
      // Esc and backdrop clicks both end up here
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {open && <div className="drawer__body">{children}</div>}
    </dialog>
  );
}
