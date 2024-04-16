import { ProductSizeType, ProductType } from "../types/ProductType";

/**
 * Rounds the given price to two decimal places.
 *
 * @param price - The price to be rounded.
 * @returns The rounded price.
 */
export const roundPrice = (price: number): number => {
  return Math.round(price * 100) / 100;
};

const requiredProductFields: (keyof ProductType)[] = [
  "name",
  "reference",
  "selling_price",
  "selling_price_with_vat",
  "brand_id",
  "vat_rate",
];

const requiredProductSizeFields: (keyof ProductSizeType)[] = ["size", "stock"];

const requiredDefaultProductFields: (keyof ProductType)[] = [
  "measurement_quantity",
  "measurement_unit",
  "stock",
];

export const validateProductForm = (product: ProductType): boolean => {
  for (const field of requiredProductFields) {
    const value = product[field];
    if (value === undefined || value === null || value === "" || value === 0) {
      return false;
    }
  }
  if (product.product_type === "default") {
    for (const field of requiredDefaultProductFields) {
      const value = product[field];
      if (
        value === undefined ||
        value === null ||
        value === "" ||
        value === 0
      ) {
        return false;
      }
    }
  }
  if (product.product_type === "clothes") {
    if (product.product_sizes) {
      for (const size of product.product_sizes) {
        for (const field of requiredProductSizeFields) {
          const value = size[field];
          if (
            value === undefined ||
            value === null ||
            value === "" ||
            value === 0
          ) {
            return false;
          }
        }
      }
    }
  }
  return true;
};
