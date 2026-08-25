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
