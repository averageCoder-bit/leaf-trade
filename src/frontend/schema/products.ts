import * as z from "zod";

export const productSchema = z.object({
  product_id: z.uuid,
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(100),
});
