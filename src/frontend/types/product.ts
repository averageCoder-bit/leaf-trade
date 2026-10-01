export type ProductPreviewVariant = "marketplace" | "product";

export interface ProductGridPreview {
  id: string;
  image: string;
  name: string;
  price: number;
  category: string;
  sellerName: string;
}

export interface ProductPreviewProps {
  product: ProductGridPreview;
  variant?: ProductPreviewVariant;
}
