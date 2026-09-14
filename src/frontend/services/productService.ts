import api, { authHeader } from "../hooks/api";
import type { Product } from "../schema/products";
import { productSchema } from "../schema/products";

export default async function createProduct(
  data: Product,
  token: string,
): Promise<Product> {
  const validatedData = productSchema.parse(data);

  const { data: response } = await api.post<Product>(
    "/products",
    validatedData,
    authHeader(token),
  );
  return response;
}
