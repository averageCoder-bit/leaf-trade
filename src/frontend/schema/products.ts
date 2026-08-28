import * as z from "zod";
const productFileSchema = z
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
      file.type === "video/mp4" ? 50 * 1024 * 1024 : 5 * 1024 * 1024;

    return file.size <= maxSize;
  }, "File exceeds the maximum allowed size");
export const productSchema = z.object({
  product_id: z.uuid,
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
    .max(5, "Maximum of 5 files"),
  category: z.string().max(30),
  condition: z.string().max(30),
  delivery_options: z.string().max(30),
});
