import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Store, CircleAlert, LoaderCircle } from "lucide-react";
import { Search } from "lucide-react";

import PageHeader from "../components/PageHeader";
import SearchFilter from "../components/SearchFilterBar";
import ProductGrid from "../components/products/ProductGrid";
import Pagination from "../components/Pagination";
import StateDisplay from "../components/StateDisplay";
import MobileSearchOverlay from "../components/MobileSearchOverlay";

import type { ProductGridPreview } from "../types/product";

import {
  fetchMarketplacePage,
  fetchMarketplaceCount,
} from "../services/productService";

const PAGE_SIZE = 12;

const Marketplace = () => {
  const [page, setPage] = useState(1);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  // Fetch products for the selected page.
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

  // Fetch the total number of active marketplace listings.
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

  // Keep the current page valid when the listing count changes.
  useEffect(() => {
    if (!countPending && !countError && page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages, countPending, countError]);

  // Transform API products into product grid previews.
  const previewProducts: ProductGridPreview[] = products.map((product) => ({
    id: product.product_id,
    image: product.preview_image ?? "",
    name: product.name,
    price: product.price,
    category: product.category,
    sellerName: product.seller_name ?? undefined,
  }));

  const handleRefresh = () => {
    void refetchProducts();
    void refetchCount();
  };

  return (
    <div className="flex h-full w-full min-h-0 flex-col overflow-y-auto scrollbar-none bg-white p-4 md:rounded-2xl md:p-6 md:shadow-sm">
      {/* Reusable page header */}

      <PageHeader
        title="Marketplace"
        description="Discover products from the community"
        actions={
          <SearchFilter
            placeholder="Search for products..."
            filterTitle="Filter products"
          />
        }
        mobileAction={
          <button
            type="button"
            onClick={() => setMobileSearchOpen(true)}
            aria-label="Search products"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
          >
            <Search size={20} />
          </button>
        }
      />

      {/* Marketplace content */}
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
                onClick={handleRefresh}
                className="cursor-pointer rounded-lg bg-[#75cf4c] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#5fb33a]"
              >
                Refresh
              </button>
            }
          />
        ) : previewProducts.length > 0 ? (
          <ProductGrid products={previewProducts} />
        ) : (
          <StateDisplay
            icon={<Store size={50} />}
            title={
              totalProducts === 0
                ? "No products available"
                : "No products on this page"
            }
            description={
              totalProducts === 0
                ? "The marketplace is empty. Why not be the first seller?"
                : "Some listings may have changed. Try refreshing the marketplace."
            }
            action={
              totalProducts > 0 ? (
                <button
                  type="button"
                  onClick={handleRefresh}
                  className="cursor-pointer rounded-lg bg-[#75cf4c] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#5fb33a]"
                >
                  Refresh
                </button>
              ) : undefined
            }
          />
        )}
      </div>
      {/* Desktop and mobile pagination */}
      {!countPending && !countError && !isError && totalProducts > 0 && (
        <div className="mt-6 flex w-full justify-center">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
      {mobileSearchOpen && (
        <MobileSearchOverlay onClose={() => setMobileSearchOpen(false)} />
      )}
    </div>
  );
};

export default Marketplace;
