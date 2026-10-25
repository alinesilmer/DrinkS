import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MenuDrawer } from "@/components/layout/MenuDrawer";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { useBagDrawer } from "@/context/bag/bagDrawerContext";
import { useCart } from "@/context/cart/cartContext";
import { cx } from "@/lib/text";
import { NAV_LINKS, ROUTES } from "@/app/routes";
import { NAV } from "@/data/content";

/**
 * One long frosted-glass bar: logo, the pages, and the cart. It stays at the top of the screen
 * while you scroll. On narrow screens the pages move into a panel behind a menu button.
 */
export function Navbar() {
  const { count } = useCart();
  const bag = useBagDrawer();
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(false);

  // a link to the page you are already on takes you back to its top
  const toTopIfHere = (to: string) => () => {
    if (to === pathname) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="navbar">
      <div className="navbar__capsule">
        <Link className="navbar__logo" to={ROUTES.home} aria-label={NAV.home} onClick={toTopIfHere(ROUTES.home)}>
          <Logo />
        </Link>
        <nav className="navbar__links" aria-label={NAV.main}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              onClick={toTopIfHere(link.to)}
              className={({ isActive }) => cx("navbar__link", isActive && "is-active")}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="navbar__tools">
          <Button variant="bag" aria-label={`${NAV.bag}: ${count}`} aria-haspopup="dialog" onClick={bag.open}>
            <Icon name="bag" />
            {count > 0 && (
              <span className="btn__badge" aria-hidden="true">
                {count}
              </span>
            )}
          </Button>
          <Button variant="bag" className="navbar__menu" aria-label={NAV.menu} aria-haspopup="dialog" onClick={() => setMenu(true)}>
            <Icon name="menu" />
          </Button>
        </div>
      </div>
      <MenuDrawer open={menu} onClose={() => setMenu(false)} onPick={(to) => toTopIfHere(to)()} />
    </header>
  );
}
