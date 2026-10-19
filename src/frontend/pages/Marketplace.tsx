import { useEffect, useState } from "react";
import SearchFilter from "../components/SearchFilterBar";
import ProductGrid from "../components/products/ProductGrid";
import Pagination from "../components/Pagination";
import { Store, CircleAlert, LoaderCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { ProductGridPreview } from "../types/product";
import StateDisplay from "../components/StateDisplay";

import {
  fetchMarketplacePage,
  fetchMarketplaceCount,
} from "../services/productService";

const PAGE_SIZE = 12;

const MarketPlace = () => {
  const [page, setPage] = useState(1);

  // Fetch products for the current page
  const {
    data: products = [],
    isPending,
    isError,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["products", "marketplace", "page", page],
    queryFn: () =>
      fetchMarketplacePage({
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
      }),
  });

  // Get the total number of active products
  const {
    data: totalProducts = 0,
    isPending: countPending,
    isError: countError,
    refetch: refetchCount,
  } = useQuery({
    queryKey: ["products", "marketplace", "count"],
    queryFn: fetchMarketplaceCount,
  });

  const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE));

  // Return to a valid page if the product count decreases
  useEffect(() => {
    if (!countPending && !countError && page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages, countPending, countError]);

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
        {isPending || countPending ? (
          <StateDisplay
            icon={<LoaderCircle size={48} className="animate-spin" />}
            title="Loading products"
            description="Please wait while we fetch the marketplace listings."
          />
        ) : isError || countError ? (
          <StateDisplay
            icon={<CircleAlert size={50} className="text-red-400" />}
            title="Unable to load marketplace"
            description="We couldn't fetch the products right now."
            action={
              <button
                type="button"
                onClick={() => {
                  void refetchProducts();
                  void refetchCount();
                }}
                className="rounded-lg bg-[#75cf4c] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#5fb33a] hover:cursor-pointer"
              ></button>
            }
          />
        ) : previewProducts.length > 0 ? (
          <ProductGrid products={previewProducts} />
        ) : (
          <StateDisplay
            icon={<Store size={50} />}
            title="No products available"
            description="The marketplace is empty. Why not be the first seller?"
          />
        )}
      </div>

      {!countPending && !countError && totalProducts > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default MarketPlace;
