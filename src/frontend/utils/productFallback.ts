const fallbackByCategory: Record<string, string> = {
  "home & living": "home-living.webp",
  "fashion & clothing": "fashion-clothing.webp",
  "books & education": "books-education.webp",
  "sports & outdoors": "sports-outdoors.webp",
  "toys & games": "toys-games.webp",
  electronics: "electronics.webp",
  "beauty & personal care": "beauty-personal-care.webp",
  "hobbies & collections": "hobbies-collections.webp",
  "pet & supplies": "pet-supplies.webp",
  "tools & equipment": "tools-equipment.webp",
  automotive: "automotive.webp",
};

export function getProductFallback(category: string): string {
  const filename =
    fallbackByCategory[category.trim().toLowerCase()] ?? "default.webp";
  return `/images/products-fallback/${filename}`;
}
