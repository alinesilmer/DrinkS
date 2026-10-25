import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/text";
import { NAV_LINKS } from "@/app/routes";
import { NAV } from "@/data/content";

interface MenuDrawerProps {
  open: boolean;
  onClose: () => void;
  /** Called with the page you picked, so a link to the page you are on can take you back to its top. */
  onPick: (to: string) => void;
}

/** The pages in a panel from the right, for the screens where the bar has no room for them. */
export function MenuDrawer({ open, onClose, onPick }: MenuDrawerProps) {
  return (
    <Drawer open={open} onClose={onClose} label={NAV.sections}>
      <header className="drawer__head">
        <h2 className="drawer__title">{NAV.sections}</h2>
        <Button variant="icon" aria-label={NAV.closeMenu} onClick={onClose}>
          <Icon name="close" />
        </Button>
      </header>
      <nav className="menu-drawer__links" aria-label={NAV.main}>
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            onClick={() => {
              onPick(link.to);
              onClose();
            }}
            className={({ isActive }) => cx("menu-drawer__link", isActive && "is-active")}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </Drawer>
  );
}
