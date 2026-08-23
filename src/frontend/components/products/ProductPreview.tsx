import { type ProductPreviewProps } from "../../types/product";

const ProductPreview = ({ product }: ProductPreviewProps) => {
  return (
    <div
      className="flex w-full max-w-60 flex-col overflow-hidden rounded-2xl bg-white shadow-sm
        transition-transform duration-300 ease-out will-change-transform
        hover:scale-105"
    >
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover"
      />

      <div className="flex w-full flex-col">
        <div className="flex flex-col p-4 gap-4">
          <h2 className="truncate text-sm md:text-lg font-semibold">
            {product.name}
          </h2>

          <p className="text-xs md:text-base font-medium">
            ₱{product.price.toLocaleString()}
          </p>

          <span className="w-fit rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
            {product.category}
          </span>
        </div>

        <div className="border-t border-gray-100 p-3 text-right">
          <p className="text-xs text-gray-500">{product.sellerName}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
