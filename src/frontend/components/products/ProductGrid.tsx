import ProductPreview from "./ProductPreview";
import type { Product } from "../../types/product";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-2 w-full md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] justify-items-center gap-x-4 gap-y-8 md:p-7">
      {products.map((product) => (
        <ProductPreview key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
