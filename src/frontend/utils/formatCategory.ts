const categoryLabels: Record<string, string> = {
  "home-and-living": "Home & Living",
  "fashion-and-clothing": "Fashion & Clothing",
  "books-and-education": "Books & Education",
  "sports-and-outdoors": "Sports & Outdoors",
  "toys-and-games": "Toys & Games",
  electronics: "Electronics",
  "beauty-and-personal-care": "Beauty & Personal Care",
  "hobbies-and-collections": "Hobbies & Collections",
  "pet-and-supplies": "Pet & Supplies",
  "tools-and-equipment": "Tools & Equipment",
  automotive: "Automotive",
};

export function formatCategory(category: string): string {
  const slug = category.trim().toLowerCase();

  return (
    categoryLabels[slug] ??
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}
