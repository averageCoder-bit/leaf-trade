// Standalone client for seller product management.
// Adapt BASE_URL import if your current frontend already exports an API client.
export type ListingStatus = "pending_upload" | "active" | "archived" | "sold" | "deleted";

export interface SellerProduct {
  product_id: string;
  user_id: string;
  name: string;
  price: number;
  description: string;
  condition: string;
  category: string;
  attributes: Record<string, unknown> | null;
  delivery_options: string;
  listing_status: ListingStatus;
  listed_at: string | null;
  sold_at: string | null;
  preview_image: string | null;
  seller_name: string | null;
  media: Array<{ file_id: string; url: string | null; content_type: string }>;
}

export type EditableProduct = Pick<
  SellerProduct,
  "name" | "price" | "description" | "condition" | "category" | "delivery_options"
> & { attributes: Record<string, unknown> };

export type GetToken = () => Promise<string | null>;
const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000").replace(/\/$/, "");

async function authorizedRequest<T>(
  path: string,
  getToken: GetToken,
  options: RequestInit = {},
): Promise<T> {
  const token = await getToken();
  if (!token) throw new Error("Please sign in again to manage your products.");
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });
  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = await response.json();
      if (typeof body.detail === "string") message = body.detail;
    } catch { /* Non-JSON error response */ }
    throw new Error(message);
  }
  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export const myProductsApi = {
  list: (getToken: GetToken) =>
    authorizedRequest<SellerProduct[]>("/users/me/products", getToken),

  update: (getToken: GetToken, id: string, changes: Partial<EditableProduct>) =>
    authorizedRequest<SellerProduct>(`/products/${encodeURIComponent(id)}`, getToken, {
      method: "PATCH", body: JSON.stringify(changes),
    }),

  setStatus: (getToken: GetToken, id: string, listing_status: "active" | "archived") =>
    authorizedRequest<SellerProduct>(`/products/${encodeURIComponent(id)}/status`, getToken, {
      method: "PATCH", body: JSON.stringify({ listing_status }),
    }),

  remove: (getToken: GetToken, id: string) =>
    authorizedRequest<void>(`/products/${encodeURIComponent(id)}`, getToken, {
      method: "DELETE",
    }),
};
