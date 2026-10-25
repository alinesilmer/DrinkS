import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/SiteFrame";
import { BagDrawer } from "@/features/bag/BagDrawer";
import HomePage from "@/pages/HomePage";
import { useRouteTheme } from "@/hooks/useRouteTheme";
import { ROUTES } from "@/app/routes";

// The landing page ships in the main bundle; the other pages load when first visited.
const ProductsPage = lazy(() => import("@/pages/ProductsPage"));
const RecipesPage = lazy(() => import("@/pages/RecipesPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));

export function App() {
  useRouteTheme();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Suspense>
        <Routes>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.products} element={<ProductsPage />} />
          <Route path={ROUTES.recipes} element={<RecipesPage />} />
          <Route path={ROUTES.contact} element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
      <Footer />
      <BagDrawer />
    </>
  );
}
