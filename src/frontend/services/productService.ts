import api from "../hooks/api";
import type { Product } from "../schema/products";
import { productSchema } from "../schema/products";

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

export default async function createProduct(
  data: Product,
): Promise<CreateProductResponse> {
  const validatedData = productSchema.parse(data);

  const { data: response } = await api.post<CreateProductResponse>(
    "/products",
    validatedData,
  );

  return response;
}

export async function completeProduct(
  productId: string,
): Promise<CompleteProductResponse> {
  const { data: response } = await api.post<CompleteProductResponse>(
    `/products/${productId}/complete`,
  );

  return response;
}
