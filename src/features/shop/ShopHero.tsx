import { PetalBurst } from "@/components/ui/PetalBurst";
import { SHOP } from "@/data/shopContent";

/** The headline on the logo's burnt orange, with its splash of petals blooming behind. */
export function ShopHero() {
  return (
    <header className="shop-hero">
      <PetalBurst className="shop-hero__burst shop-hero__burst--big" />
      <PetalBurst className="shop-hero__burst shop-hero__burst--small" />
      <div className="wrap shop-hero__content">
        <p className="shop-hero__kicker">{SHOP.kicker}</p>
        <h1 className="shop-hero__title">{SHOP.title}</h1>
      </div>
    </header>
  );
}
