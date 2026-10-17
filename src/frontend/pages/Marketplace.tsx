import SearchFilter from "../components/SearchFilterBar";
import ProductGrid from "../components/products/ProductGrid";
import Pagination from "../components/Pagination";
import { Store } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { ProductGridPreview } from "../types/product";
import { fetchProducts } from "../services/productService";

const MarketPlace = () => {
  const {
    data: products = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["products", "marketplace"],
    queryFn: fetchProducts,
  });

  const previewProducts: ProductGridPreview[] = products.map((product) => ({
    id: product.product_id,
    image: product.preview_image ?? "",
    name: product.name,
    price: product.price,
    category: product.category,
    sellerName: product.seller_name ?? undefined,
  }));

  return (
    <div className="flex h-full w-full flex-col items-center overflow-y-auto scrollbar-none rounded-2xl bg-white p-4 pt-0 shadow-sm">
      <div className="sticky top-0 z-10 mb-6 flex w-full shrink-0 justify-center bg-white py-4 md:justify-between">
        <SearchFilter
          placeholder="Search for products..."
          filterTitle="Filter products"
        />
      </div>

      <div className="flex w-full flex-1 flex-col">
        {isPending ? (
          <p className="py-10 text-center">Loading products...</p>
        ) : isError ? (
          <p className="py-10 text-center text-red-500">
            Failed to load products.
          </p>
        ) : previewProducts.length > 0 ? (
          <ProductGrid products={previewProducts} />
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <Store size={50} />
            <p>The marketplace is empty. Why not be the first seller?</p>
          </div>
        )}
      </div>

      <Pagination />
    </div>
  );
};

export default MarketPlace;
