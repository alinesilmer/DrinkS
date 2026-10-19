import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { useBagDrawer } from "@/context/bag/bagDrawerContext";
import { useCart } from "@/context/cart/cartContext";
import { useHideOnScroll } from "@/hooks/useHideOnScroll";
import { cx } from "@/lib/text";
import { NAV_LINKS, ROUTES } from "@/app/routes";
import { NAV } from "@/data/content";

/**
 * One floating capsule: logo, the three pages, and the cart. It slides away while you scroll
 * down and comes back as soon as you scroll up.
 */
export function Navbar() {
  const { count } = useCart();
  const bag = useBagDrawer();
  const hidden = useHideOnScroll();
  const { pathname } = useLocation();

  // a link to the page you are already on takes you back to its top
  const toTopIfHere = (to: string) => () => {
    if (to === pathname) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className={cx("navbar", hidden && "is-hidden")}>
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
        <Button variant="bag" aria-label={`${NAV.bag}: ${count}`} aria-haspopup="dialog" onClick={bag.open}>
          <Icon name="bag" />
          {count > 0 && (
            <span className="btn__badge" aria-hidden="true">
              {count}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
}
