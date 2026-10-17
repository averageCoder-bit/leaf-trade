import ProductPreview from "./ProductPreview";
import type { ProductGridPreview } from "../../types/product";

interface ProductGridProps {
  products: ProductGridPreview[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div
      className="grid w-full grid-cols-1
        gap-5
        justify-items-stretch
        md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]
        md:justify-items-start
        md:gap-8 md:p-7"
    >
      {products.map((product) => (
        <ProductPreview key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
