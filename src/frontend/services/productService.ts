import api from "../hooks/api";
import type { Product } from "../schema/products";
import { productSchema } from "../schema/products";
import type {
  CreateProductResponse,
  MarketplaceProduct,
  CompleteProductResponse,
  FetchProductsResponse,
} from "../types/product";

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

export async function fetchProducts(): Promise<MarketplaceProduct> {
  const { data } = await api.get<MarketplaceProduct>("/product/:id");

  return data;
}

export async function completeProduct(
  productId: string,
): Promise<CompleteProductResponse> {
  const { data: response } = await api.post<CompleteProductResponse>(
    `/products/${productId}/complete`,
  );

  return response;
}

interface MarketplacePageParams {
  limit: number;
  offset: number;
}

export async function fetchMarketplacePage({
  limit,
  offset,
}: MarketplacePageParams): Promise<FetchProductsResponse[]> {
  const { data } = await api.get<FetchProductsResponse[]>("/marketplace", {
    params: { limit, offset },
  });

  return data;
}

export async function fetchMarketplaceCount(): Promise<number> {
  const { data } = await api.get<{ total: number }>("/marketplace/count");

  return data.total;
}
