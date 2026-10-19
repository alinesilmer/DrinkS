import { ICON_PATHS, type IconName } from "@/components/ui/iconPaths";

/** Decorative line icon. Give the surrounding control an aria-label. */
export function Icon({ name }: { name: IconName }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}
