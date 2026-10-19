import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ImageOff } from "lucide-react";
import type { ProductPreviewProps } from "../../types/product";
import { getProductFallback } from "../../utils/productFallback";
import { formatCategory } from "../../utils/formatCategory";
import { getCategoryColor } from "../../utils/categoryColors";

const ProductPreview = ({ product }: ProductPreviewProps) => {
  const navigate = useNavigate();
  const [imageFailed, setImageFailed] = useState(false);
  const [fallbackFailed, setFallbackFailed] = useState(false);

  const fallbackImage = getProductFallback(product.category);

  const usingFallback = !product.image || imageFailed;
  const imageSrc = usingFallback ? fallbackImage : product.image;

  useEffect(() => {
    setImageFailed(false);
    setFallbackFailed(false);
  }, [product.image, fallbackImage]);

  const sellerName = product.sellerName?.trim() ?? "";

  const sellerInitials = sellerName.slice(0, 2).toUpperCase();

  return (
    <div
      title={product.name}
      onClick={() => navigate(`/product/${product.id}`)}
      className="flex w-full max-w-none flex-col overflow-hidden
      rounded-2xl bg-white shadow-sm
      transition-transform duration-300 ease-out
      md:max-w-60 md:hover:scale-105
      hover:cursor-pointer outline outline-gray-300 "
    >
      <div className="relative flex h-56 w-full items-center justify-center bg-gray-100 md:h-48">
        <span
          className={`absolute left-2 top-2 z-10 max-w-[calc(100%-1rem)]
          truncate rounded-full px-3 py-1 text-[11px]
          font-medium shadow-sm ${getCategoryColor(product.category)}`}
        >
          {formatCategory(product.category)}
        </span>
        {fallbackFailed ? (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <ImageOff size={32} />
            <span className="text-xs">No image available</span>
          </div>
        ) : (
          <img
            src={imageSrc}
            alt={
              usingFallback
                ? `Representative image for ${product.category}`
                : product.name
            }
            loading="lazy"
            onError={() => {
              if (usingFallback) {
                setFallbackFailed(true);
              } else {
                setImageFailed(true);
              }
            }}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="flex w-full flex-col">
        <div className="flex flex-col gap-4 p-4">
          <h2 className="truncate text-sm font-semibold md:text-lg">
            {product.name}
          </h2>

          <p className="text-xs font-medium md:text-base">
            ₱{product.price.toLocaleString("en-PH")}
          </p>
        </div>

        <div className="flex w-full items-center justify-between gap-3 border-t border-gray-100 p-3">
          {sellerName && (
            <div className="flex min-w-0 items-center gap-2">
              <div
                className="flex h-5 w-5 shrink-0 items-center
              justify-center rounded-full bg-teal-600
              text-[8px] font-semibold text-white"
                aria-hidden="true"
              >
                {sellerInitials}
              </div>

              <p
                title={sellerName}
                className="min-w-0 flex-1 truncate text-xs text-gray-500"
              >
                {sellerName}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
