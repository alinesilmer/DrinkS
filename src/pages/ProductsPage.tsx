import { AsyncContent } from "@/components/ui/AsyncContent";
import { Shop } from "@/features/shop/Shop";
import { useAsync } from "@/hooks/useAsync";
import { catalogService } from "@/services/catalogService";

/** Productos: categories and every product, ready to add to the bag. */
export default function ProductsPage() {
  const products = useAsync(catalogService.getProducts);

  return (
    <main className="page">
      <AsyncContent state={products}>{(data) => <Shop products={data} />}</AsyncContent>
    </main>
  );
}
