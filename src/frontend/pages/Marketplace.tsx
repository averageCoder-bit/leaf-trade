import { Store } from "lucide-react";
import SearchFilter from "../components/SearchFilterBar";
import ProductGrid from "../components/products/ProductGrid";
import type { Product } from "../types/product";

const MarketPlace = () => {
  const testProducts: Product[] = [
    {
      id: "test-product-001",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      name: "Classic Running Shoes",
      price: 2499,
      category: "Fashion",
      tags: ["Shoes", "Sports", "Running"],
      sellerName: "Kyle's Shop",
    },
    {
      id: "test-product-002",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      name: "Minimalist Wristwatch",
      price: 1850,
      category: "Accessories",
      tags: ["Accessories", "Watch", "Fashion"],
      sellerName: "Timepiece Hub",
    },
    {
      id: "test-product-003",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b",
      name: "Wireless Headphones",
      price: 3299,
      category: "Electronics",
      tags: ["Electronics", "Audio", "Wireless"],
      sellerName: "Tech Corner",
    },
    {
      id: "test-product-004",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
      name: "The Great Gatsby",
      category: "Books",
      price: 450,
      tags: ["Books", "Fiction", "Classic"],
      sellerName: "Book Nook",
    },
    {
      id: "test-product-005",
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
      name: "Wooden Study Desk",
      category: "Furniture",
      price: 5200,
      tags: ["Furniture", "Desk", "Home"],
      sellerName: "Home Finds",
    },
    {
      id: "test-product-006",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
      name: "Skincare Essentials Set",
      category: "Beauty",
      price: 1299,
      tags: ["Beauty", "Skincare", "Self Care"],
      sellerName: "Glow Market",
    },
  ];
  return (
    <div className="flex h-full w-full flex-col items-center overflow-y-auto scrollbar-none rounded-2xl bg-white p-4 pt-0 shadow-sm">
      <div className="sticky top-0 z-10 mb-6 flex w-full shrink-0 justify-center md:justify-between py-4 bg-white">
        <SearchFilter
          placeholder="Search for products..."
          filterTitle="Filter products"
        />
      </div>

      <div className="flex w-full flex-1 flex-col items-center justify-center">
        <ProductGrid products={testProducts} />
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
          <Store size={50} />
          <p className="text-sm md:text-base">
            The marketplace is empty. Why not be the first seller?
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
