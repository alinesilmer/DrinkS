import { Link } from "react-router-dom";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS, ROUTES } from "@/app/routes";
import { FOOTER } from "@/data/content";
import { CONTACT } from "@/data/contactContent";

/** One promise, the shop in short columns, and the small print. */
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <p className="site-footer__line">
            <span className="site-footer__words">{FOOTER.line}</span>
            <span className="site-footer__script">{FOOTER.script}</span>
          </p>
          <ButtonLink variant="primary" href={ROUTES.products}>
            {FOOTER.cta}
          </ButtonLink>
        </div>

        <div className="site-footer__cols">
          <div className="site-footer__brand">
            <Logo />
            <p>{FOOTER.blurb}</p>
          </div>

          <nav aria-label={FOOTER.navTitle}>
            <h2 className="site-footer__title">{FOOTER.navTitle}</h2>
            <ul className="site-footer__list">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="site-footer__title">{FOOTER.deliveryTitle}</h2>
            <ul className="site-footer__list">
              {FOOTER.delivery.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="site-footer__title">{FOOTER.contactTitle}</h2>
            <ul className="site-footer__list">
              {CONTACT.channels.slice(0, 2).map((c) => (
                <li key={c.label}>
                  <Icon name={c.icon} />
                  {c.value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="site-footer__legal">
          <p>{FOOTER.rights}</p>
          <p>{FOOTER.legal}</p>
        </div>
      </div>
    </footer>
  );
}
