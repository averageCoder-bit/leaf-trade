export type ProductPreviewVariant = "marketplace" | "product";

export interface ProductGridPreview {
  id: string;
  image: string;
  name: string;
  price: number;
  category: string;
  sellerName?: string;
}

export interface ProductPreviewProps {
  product: ProductGridPreview;
  variant?: ProductPreviewVariant;
}

export interface PresignedUpload {
  filename: string;
  object_key: string;
  upload_url: string;
}

export interface CreateProductResponse {
  product_id: string;
  upload_urls: PresignedUpload[];
}

export interface CompleteProductResponse {
  product_id: string;
  listing_status: "active";
}

export interface MarketplaceProduct {
  product?: {
    product_id: string;
    user_id: string;
    name: string;
    seller_name: string | null;
    price: number;
    description: string;
    condition: string;
    category: string;
    attributes: Record<string, unknown>;
    delivery_options: string;
    listing_status: "pending_upload" | "active";
    listed_at: string;
    sold_at: string | null;
    preview_image: string | null;
    media: {
      file_id: string;
      url: string;
      content_type: string;
    }[];
  };
}

export interface FetchProductsResponse {
  product_id: string;
  name: string;
  price: number;
  category: string;
  preview_image: string | null;
  seller_name: string | null;
}
