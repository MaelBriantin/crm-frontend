export type ProductType = {
    id: string;
    name: string;
    description?: string;
    reference: string;
    purchase_price?: number;
    selling_price: number;
    selling_price_with_vat: number;
    product_type: {label: string, value: string} | null | string;
    measurement_quantity: number;
    measurement_unit: string | null;
    vat_rate?: number | null | string;
    stock: number;
    alert_stock?: number;
    brand_id: number;
    image: string;
    createdAt: string;
    updatedAt: string;
    product_sizes?: ProductSizeType[] | null;
};

export type ProductSizeType = {
    product_id: number | null;
    size: string | null;
    stock: number | null;
};

export const emptyProductSize = {
    product_id: null,
    size: '',
    stock: null
};

export const emptyProduct: ProductType = {
    id: '',
    name: '',
    reference: '',
    purchase_price: 0,
    selling_price: 0,
    selling_price_with_vat: 0,
    product_type: null,
    measurement_quantity: 0,
    measurement_unit: '',
    vat_rate: 0,
    stock: 0,
    alert_stock: 0,
    brand_id: 0,
    image: '',
    createdAt: '',
    updatedAt: '',
    product_sizes: null
};

export type ProductOptionsType = {
    default_vat_rate: string;
    measurement_units: {label: string, value: string}[];
    vat_rates: {label: string, value: string}[];
    product_types: {label: string, value: string}[];
};