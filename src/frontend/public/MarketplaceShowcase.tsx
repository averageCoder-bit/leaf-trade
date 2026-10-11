import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LuLeaf, LuArrowDown } from "react-icons/lu";

const ITEMS_PER_PAGE = 3;

const marketplaceProducts = [
  {
    id: 1,
    name: "Backpack",
    price: 850,
    image: "/images/marketplace/backpack.jpg",
  },
  {
    id: 2,
    name: "Sneakers",
    price: 1200,
    image: "/images/marketplace/sneakers.jpg",
  },
  {
    id: 3,
    name: "Camera",
    price: 2500,
    image: "/images/marketplace/camera.jpg",
  },
  {
    id: 4,
    name: "Headphones",
    price: 1500,
    image: "/images/marketplace/headphones.jpg",
  },
  {
    id: 5,
    name: "Watch",
    price: 2200,
    image: "/images/marketplace/watch.jpg",
  },
  {
    id: 6,
    name: "Jacket",
    price: 750,
    image: "/images/marketplace/jacket.jpg",
  },
];

interface MarketplaceShowcaseProps {
  header: string;
  desc: string;
}

const MarketplaceShowcase = ({ header, desc }: MarketplaceShowcaseProps) => {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(marketplaceProducts.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (totalPages <= 1) return;

    const interval = window.setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [totalPages]);

  const visibleProducts = marketplaceProducts.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE,
  );

  return (
    <section id="marketplace-section" className="scroll-mt-20 py-10 md:py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 sm:px-6 lg:px-8">
        <span className="mb-5 rounded-full bg-[#75cf4c]/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#4b922e]">
          Marketplace
        </span>

        <h2 className="mb-6 max-w-3xl text-center text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          {header}
        </h2>

        <p className="max-w-4xl text-center text-sm leading-7 text-slate-600 sm:text-lg sm:leading-8">
          {desc}
        </p>

        {/* Marketplace preview */}
        <div className="relative mt-12 w-full rounded-xl p-4 pb-7 text-white shadow-md sm:p-6">
          {/* Preview header */}
          <div className="mb-5 flex items-center justify-end">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#75cf4c]/15">
              <LuLeaf size={22} className="text-[#75cf4c]" />
            </div>
          </div>

          {/* Product cards */}
          <div
            key={page}
            className="marketplace-fade grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {visibleProducts.map((product) => (
              <div key={product.id} className="min-w-0">
                {/* Product image */}
                <div className="relative overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="aspect-square w-full object-cover"
                  />

                  {/* Decorative bookmark
                  <div
                    aria-hidden="true"
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white"
                  >
                    <LuBookmark size={20} />
                  </div> */}
                </div>

                {/* Product information */}
                <div className="mt-3">
                  <h4 className="text-sm font-medium text-black">
                    {product.name}
                  </h4>

                  <p className="text-base font-semibold text-black">
                    ₱{product.price.toLocaleString("en-PH")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom arrow */}
          <div
            aria-hidden="true"
            className="absolute -bottom-5 left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-gray-600 bg-black text-white"
          >
            <LuArrowDown size={24} />
          </div>
        </div>

        {/* CTA */}
        <Link
          to="/marketplace"
          className="mt-14 inline-flex min-h-12 w-full items-center text-white justify-center rounded-full bg-[#75cf4c] px-8 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#65bf3d] active:translate-y-0 sm:w-auto"
        >
          View Marketplace
        </Link>
      </div>
    </section>
  );
};

export default MarketplaceShowcase;
