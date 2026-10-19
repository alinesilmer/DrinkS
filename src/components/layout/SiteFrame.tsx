import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * A new page starts at the top (unless the link points at a #section). Back and Forward
 * ("POP") are left alone, so the browser returns you to where you were.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigation = useNavigationType();

  useEffect(() => {
    if (!hash && navigation !== "POP") window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash, navigation]);

  return null;
}
