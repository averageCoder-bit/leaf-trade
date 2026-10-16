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
