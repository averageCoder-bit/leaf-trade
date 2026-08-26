interface CategoryProps {
  value: string;
  label: string;
}

interface ConditionProps {
  value: string;
  label: string;
}

export type FilePreview = {
  file: File;
  preview: string;
};

export const MAX_PRICE = 10_000_000;
export const MAX_FILES_LENGTH = 6;

export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/webm",
];

export const categories: CategoryProps[] = [
  { value: "home-and-living", label: "Home & Living" },
  { value: "fashion-and-clothing", label: "Fashion & Clothing" },
  { value: "books-and-education", label: "Books & Education" },
  { value: "sports-and-outdoors", label: "Sports & Outdoors" },
  { value: "toys-and-games", label: "Toys & Games" },
  { value: "beauty-and-personal-care", label: "Beauty & Personal Care" },
  { value: "hobbies-and-collections", label: "Hobbies & Collections" },
  { value: "pet-supplies", label: "Pet & Supplies" },
  { value: "tools-and-equipment", label: "Tools & Equipment" },
  { value: "automotive", label: "Automotive" },
];

export const conditions: ConditionProps[] = [
  { value: "brand-new", label: "Brand new" },
  { value: "like-new", label: "Like new" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "poor", label: "Poor" },
];

export const sanitizeProductName = (value: string): string => {
  return value.replace(/[^A-Za-z0-9\s-]/g, "");
};

export const sanitizeProductPrice = (value: string): string => {
  return value.replace(/[^0-9.]/g, "");
};

export const checkNameValidity = (name: string): boolean => {
  return /^[A-Za-z0-9][A-Za-z0-9\s-]*$/.test(name);
};

export const checkPriceValidity = (price: string): boolean => {
  return /^\d+(\.\d{1,2})?$/.test(price);
};
