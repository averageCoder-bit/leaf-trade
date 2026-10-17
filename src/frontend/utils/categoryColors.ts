const categoryColors: Record<string, string> = {
  "home-and-living": "bg-amber-100 text-amber-700",
  "fashion-and-clothing": "bg-pink-100 text-pink-700",
  "books-and-education": "bg-green-100 text-green-700",
  "sports-and-outdoors": "bg-orange-100 text-orange-700",
  "toys-and-games": "bg-purple-100 text-purple-700",
  electronics: "bg-blue-100 text-blue-700",
  "beauty-and-personal-care": "bg-rose-100 text-rose-700",
  "hobbies-and-collections": "bg-violet-100 text-violet-700",
  "pet-and-supplies": "bg-teal-100 text-teal-700",
  "tools-and-equipment": "bg-slate-200 text-slate-700",
  automotive: "bg-red-100 text-red-700",
};

export function getCategoryColor(category: string): string {
  return (
    categoryColors[category.trim().toLowerCase()] ?? "bg-gray-100 text-gray-700"
  );
}
