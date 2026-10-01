import SearchFilter from "../components/SearchFilterBar";
import ProductGrid from "../components/products/ProductGrid";
import Pagination from "../components/Pagination";
import { Store } from "lucide-react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { ProductGridPreview } from "../types/product";

const MarketPlace = () => {
  const baseUrl = import.meta.env.BASE_URL;

  const fetchProducts = async (): Promise<ProductGridPreview[]> => {
    const { data } = await axios.get(`${baseUrl}\products`);
    return data;
  };
  const ProductsPreview = () => {
    const { data } = useQuery({
      queryKey: ["products"],
      queryFn: fetchProducts,
    });
    const previewProducts: ProductGridPreview[] =
      data?.map((product) => ({
        id: product.id,
        image: product.image,
        name: product.name,
        price: product.price,
        category: product.category,
        sellerName: product.sellerName,
      })) ?? [];

    return <ProductGrid products={previewProducts} />;
  };

  return (
    <div className="flex h-full w-full flex-col items-center overflow-y-auto scrollbar-none rounded-2xl bg-white p-4 pt-0 shadow-sm">
      <div className="sticky top-0 z-10 mb-6 flex w-full shrink-0 justify-center md:justify-between py-4 bg-white">
        <SearchFilter
          placeholder="Search for products..."
          filterTitle="Filter products"
        />
      </div>

      <div className="flex w-full flex-1 flex-col items-center justify-center">
        <ProductsPreview />
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
          <Store size={50} />
          <p className="text-sm md:text-base">
            The marketplace is empty. Why not be the first seller?
          </p>
        </div>
      </div>
      <Pagination />
    </div>
  );
};

export default MarketPlace;
