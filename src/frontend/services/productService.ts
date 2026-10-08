import api from "../hooks/api";
import type { Product } from "../schema/products";
import { productSchema } from "../schema/products";

export default async function createProduct(data: Product): Promise<Product> {
  const validatedData = productSchema.parse(data);

  const { data: response } = await api.post<Product>(
    "/products",
    validatedData,
  );
  return response;
}
