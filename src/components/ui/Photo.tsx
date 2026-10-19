import { cx } from "@/lib/text";

interface PhotoProps {
  src: string;
  /** Empty for decorative photos. */
  alt: string;
  className?: string;
  /** Above the fold: load right away instead of lazily. */
  eager?: boolean;
}

/** A photo that fills its box (object-fit: cover), loaded lazily unless it is above the fold. */
export function Photo({ src, alt, className, eager }: PhotoProps) {
  return (
    <img
      className={cx("photo", className)}
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : undefined}
    />
  );
}
