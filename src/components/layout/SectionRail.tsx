import { Icon } from "@/components/ui/Icon";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cx } from "@/lib/text";
import { NAV, SECTIONS } from "@/data/content";

const IDS = SECTIONS.map((s) => s.id);

/** The day as five icons on the side: where you are on the page. */
export function SectionRail() {
  const active = useActiveSection(IDS);

  return (
    <nav className="rail" aria-label={NAV.sections}>
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={cx("rail__link", s.id === active && "is-on")}
          aria-label={s.label}
          aria-current={s.id === active ? "location" : undefined}
        >
          <Icon name={s.icon} />
        </a>
      ))}
    </nav>
  );
}
