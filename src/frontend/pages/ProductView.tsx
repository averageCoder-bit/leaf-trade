import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Star,
  MessageCircleMore,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  Package,
} from "lucide-react";

import { fetchProductById } from "../services/productService";
import type { ProductDetails } from "../types/product";

const ProductView = () => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeMedia, setActiveMedia] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      setProduct(null);
      setActiveMedia(0);

      if (!id) {
        setError("Invalid product ID.");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchProductById(id);

        if (!cancelled) {
          setProduct(data);
        }
      } catch {
        if (!cancelled) {
          setError("Unable to retrieve product information.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const media = product?.media.filter((item) => Boolean(item.url)) ?? [];

  const currentMedia = media[activeMedia];

  const nextMedia = () => {
    if (media.length === 0) return;

    setActiveMedia((previous) => (previous + 1) % media.length);
  };

  const previousMedia = () => {
    if (media.length === 0) return;

    setActiveMedia((previous) => (previous - 1 + media.length) % media.length);
  };

  if (loading) {
    return (
      <div className="flex min-h-full w-full items-center justify-center rounded-2xl bg-white p-7">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-full w-full flex-col items-center justify-center gap-3 rounded-2xl bg-white p-7">
        <Package size={44} className="text-gray-400" />
        <h2 className="text-xl font-semibold">Product unavailable</h2>
        <p className="text-sm text-gray-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-full w-full flex-col items-center overflow-y-auto scrollbar-none rounded-2xl bg-white p-7 shadow-sm">
      <div className="flex w-full flex-col space-y-7 md:max-w-5xl">
        {/* Product category and listing date */}
        <div className="flex flex-row justify-between gap-4">
          <p className="text-sm">{product.category}</p>

          <p className="text-sm">
            Listed on:{" "}
            {product.listed_at
              ? new Date(product.listed_at).toLocaleDateString("en-PH", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "Not available"}
          </p>
        </div>

        {/* Product name and price */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-2xl font-bold text-[#65b93e]">
            {Number(product.price).toLocaleString("en-PH", {
              style: "currency",
              currency: "PHP",
            })}
          </p>
        </div>

        {/* Product media carousel */}
        <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
          {currentMedia?.url ? (
            currentMedia.content_type.startsWith("video/") ? (
              <video
                key={currentMedia.file_id}
                src={currentMedia.url}
                controls
                className="h-full w-full object-contain"
              />
            ) : (
              <img
                src={currentMedia.url}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            )
          ) : product.preview_image ? (
            <img
              src={product.preview_image}
              alt={product.name}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-gray-400">
              <Package size={48} />
              <p>No product media available</p>
            </div>
          )}

          {media.length > 1 && (
            <>
              <button
                type="button"
                onClick={previousMedia}
                aria-label="Previous product image"
                className="absolute left-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow transition hover:bg-white"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                type="button"
                onClick={nextMedia}
                aria-label="Next product image"
                className="absolute right-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow transition hover:bg-white"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
        </div>

        {/* Media thumbnails */}
        {media.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {media.map((item, index) => (
              <button
                key={item.file_id}
                type="button"
                onClick={() => setActiveMedia(index)}
                aria-label={`View product media ${index + 1}`}
                className={`h-20 w-24 shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 ${
                  activeMedia === index ? "border-[#75cf4c]" : "border-gray-200"
                }`}
              >
                {item.content_type.startsWith("image/") ? (
                  <img
                    src={item.url ?? ""}
                    alt={`Product media ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs">
                    Video
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Description */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Description</h2>

          <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
            {product.description || "No description provided."}
          </p>

          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            <span className="rounded-full bg-gray-100 px-3 py-1">
              Condition: {product.condition}
            </span>

            <span className="rounded-full bg-gray-100 px-3 py-1">
              Delivery: {product.delivery_options}
            </span>
          </div>
        </section>

        {/* EXISTING SELLER CARD — preserved */}
        <div className="flex w-full flex-col gap-7 rounded-2xl border border-gray-300 p-5 md:p-7">
          <div className="flex w-full flex-row justify-between">
            <h2 className="text-lg font-semibold">Seller's Information</h2>

            <button
              type="button"
              title="Follow user (coming soon)"
              disabled
              className="flex items-center justify-center rounded-full p-1.5 opacity-50"
            >
              <UserPlus size={21} />
            </button>
          </div>

          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            {/* Profile and statistics */}
            <div className="flex min-w-0 flex-1 flex-col gap-6 sm:flex-row">
              {/* Seller avatar */}
              <div className="flex flex-col items-center justify-center gap-2">
                <img
                  src="/images/default-avatar.png"
                  alt="Seller profile"
                  className="h-28 w-28 shrink-0 rounded-2xl border border-gray-200 object-cover md:h-32 md:w-32"
                />

                <p>{product.seller_name || "Unknown seller"}</p>
              </div>

              {/* Seller details */}
              <div className="flex min-w-0 flex-1 flex-col gap-7">
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="truncate text-lg font-semibold">
                    {product.seller_name || "Unknown seller"}
                  </p>

                  <p className="text-sm text-gray-600">Address not available</p>

                  <p className="text-sm text-gray-600">
                    Contact information not available
                  </p>
                </div>

                {/* Seller statistics */}
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <p className="font-semibold">—</p>
                    </div>
                    <span className="text-xs text-gray-500">Rating</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <p className="font-semibold">—</p>
                    <span className="text-xs text-gray-500">Listings</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <p className="font-semibold">—</p>
                    <span className="text-xs text-gray-500">Sold Items</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <p className="font-semibold">—</p>
                    <span className="text-xs text-gray-500">Followers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Message seller */}
            <button
              type="button"
              disabled
              title="Messaging coming soon"
              className="flex w-full shrink-0 items-center justify-center gap-3 rounded-3xl bg-[#75cf4c] px-7 py-3 text-sm font-medium text-white opacity-60 xl:w-auto"
            >
              <MessageCircleMore className="hidden md:block" />
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
