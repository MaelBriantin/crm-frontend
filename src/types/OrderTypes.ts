import {CustomerType} from "./CustomerTypes.ts";
import {SectorType} from "./SectorTypes.ts";
import {ProductSizeType, ProductType} from "./ProductTypes.ts";

export type OrderType = {
    id: number;
    customer_id: number;
    customer_full_name: string;
    customer_sector_name: string;
    order_number: number;
    order_date: string;
    no_vat_total: number;
    vat_total: number;
    payment_method: string;
    payment_status: string;
    payment_status_label: string;
    products: OrderProductType[];
    status: string;
    created_at: string;
    updated_at: string;
};

export type OrderOptionsType = {
    payment_methods: { label: string, value: string }[];
};

export type OrderDetailsType = {
    id: number;
    order_number: number;
    order_date: string;
    customer_full_name: string;
    customer_sector_name: string;
    customer_address: string;
    customer_city: string;
    payment_method: string;
    payment_method_label: string;
    payment_status_label: string;
    is_paid: boolean;
    deferred_date: string;
    no_vat_total: number;
    vat_total: number;
    ordered_products: OrderProductType[];
    customer: CustomerType;
    sector: SectorType;
    status: string;
    created_at: string;
    updated_at: string;
};

export type OrderCreationType = {
    customer_id: number;
    payment_method: string;
    products: OrderProductType[];
    deferred_date?: string;
    comment?: string;
};

export type OrderProductType = {
    product_type: string;
    ordered_quantity: number;
    product_id: number;
    size_id?: number;
};

export type OrderedProductType = {
    id: number;
    order_id: number;
    product_id: number;
    product_size_id: number;
    product_type: string;
    ordered_quantity: number;
    product_reference: string;
    product_name: string;
    no_vat_price: string;
    vat_price: string;
    created_at: Date;
    updated_at: Date;
    product: ProductType
    product_size?: ProductSizeType;
}