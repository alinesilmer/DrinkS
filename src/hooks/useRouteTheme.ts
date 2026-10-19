import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { type RoutePath, THEMES } from "@/app/routes";

/** Puts the palette of the current page on <html>, before the page is painted. */
export function useRouteTheme(): void {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = THEMES[pathname as RoutePath] ?? THEMES["/"];
  }, [pathname]);
}
