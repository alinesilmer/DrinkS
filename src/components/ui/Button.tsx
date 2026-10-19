import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type Ref } from "react";
import { Link } from "react-router-dom";
import { type ButtonLook, buttonClass } from "@/components/ui/buttonClass";

type ButtonProps = ButtonLook & ButtonHTMLAttributes<HTMLButtonElement> & { ref?: Ref<HTMLButtonElement> };

/** Every button in the app. `type` defaults to "button" so nothing submits by accident. */
export function Button({ variant, className, type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={buttonClass({ variant }, className)} {...rest} />;
}

type ButtonLinkProps = ButtonLook &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: `#${string}` | `/${string}` };

/**
 * A link that looks like a button. `href` is typed to in-page anchors and same-site paths,
 * so a link can never point at an arbitrary or `javascript:` URL. Paths go through the router
 * (no page reload); anchors stay plain links.
 */
export function ButtonLink({ variant, className, href, ...rest }: ButtonLinkProps) {
  const cls = buttonClass({ variant }, className);
  return href.startsWith("/") ? <Link to={href} className={cls} {...rest} /> : <a href={href} className={cls} {...rest} />;
}
