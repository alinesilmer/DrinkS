import { type ReactNode, type Ref } from "react";
import { type SectionId } from "@/types/content";
import { cx } from "@/lib/text";

interface SectionProps {
  id: SectionId;
  className?: string;
  /** Adds the standard section padding. */
  padded?: boolean;
  children: ReactNode;
  ref?: Ref<HTMLElement>;
}

export function Section({ id, className, padded = true, children, ref }: SectionProps) {
  return (
    <section ref={ref} id={id} className={cx(padded && "section", className)}>
      {children}
    </section>
  );
}

export function Heading({ children, size }: { children: ReactNode; size?: "xl" }) {
  return <h2 className={cx("heading", size && `heading--${size}`)}>{children}</h2>;
}
