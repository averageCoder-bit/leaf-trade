import { useState, useEffect } from "react";
import { ImageOff } from "lucide-react";
import type { ProductPreviewProps } from "../../types/product";
import { getProductFallback } from "../../utils/productFallback";
import { formatCategory } from "../../utils/formatCategory";
import { productSchema } from "../../schema/products";

const ProductPreview = ({ product }: ProductPreviewProps) => {
  const [imageFailed, setImageFailed] = useState(false);
  const [fallbackFailed, setFallbackFailed] = useState(false);

  const fallbackImage = getProductFallback(product.category);

  const usingFallback = !product.image || imageFailed;
  const imageSrc = usingFallback ? fallbackImage : product.image;

  useEffect(() => {
    setImageFailed(false);
    setFallbackFailed(false);
  }, [product.image, fallbackImage]);

  return (
    <div
      title={product.name}
      className="flex w-full max-w-none flex-col overflow-hidden
      rounded-2xl bg-white shadow-sm
      transition-transform duration-300 ease-out
      md:max-w-60 md:hover:scale-105
      hover:cursor-pointer outline outline-gray-300 "
    >
      <div className="flex h-56 w-full items-center justify-center bg-gray-100 md:h-48">
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

          <span className="w-fit rounded-full bg-gray-100 py-1 text-xs text-gray-600">
            {formatCategory(product.category)}
          </span>
        </div>

        {product.sellerName && (
          <div className="border-t border-gray-100 p-3 text-right">
            <p className="text-xs text-gray-500">{product.sellerName}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPreview;
