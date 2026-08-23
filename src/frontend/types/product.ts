export type ProductPreviewVariant = "marketplace" | "product";

export interface Product {
  id: string;
  image: string;
  name: string;
  price: number;
  category: string;
  tags: string[];
  sellerName: string;
}

export interface ProductPreviewProps {
  product: Product;
  variant?: ProductPreviewVariant;
}
