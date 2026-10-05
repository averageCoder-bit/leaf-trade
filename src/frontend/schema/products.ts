import * as z from "zod";
export const uploadFileSchema = z
  .instanceof(File)
  .refine(
    (file) =>
      ["image/jpeg", "image/png", "image/webp", "video/mp4"].includes(
        file.type,
      ),
    "Unsupported file type",
  )
  .refine((file) => {
    const maxSize =
      file.type === "video/mp4" ? 25 * 1024 * 1024 : 5 * 1024 * 1024;

    return file.size <= maxSize;
  }, "File exceeds the maximum allowed size");

const productFileSchema = z.object({
  filename: z.string(),
  content_type: z.string(),
});

export const productSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(2000),
  price: z
    .number()
    .positive("Price must be greater than 0")
    .min(0.01)
    .max(10000000),
  product_files: z
    .array(productFileSchema)
    .min(1, "At least one file is required")
    .max(6, "Maximum of 6 files"),
  category: z.string().max(30),
  condition: z.string().max(30),
  delivery_options: z.string().max(30),
  attributes: z
    .object({
      model: z.string().max(50),
      brand: z.string().max(50),
      year_brought: z.number(),
      warranty: z.string(),
    })
    .partial(),
});

export type Product = z.infer<typeof productSchema>;
export type ProductFiles = z.infer<typeof uploadFileSchema>;
