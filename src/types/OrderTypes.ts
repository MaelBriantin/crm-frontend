export type OrderType = {
    id: number;
    customer_id: number;
    products: OrderProductType[];
    status: string;
    created_at: string;
    updated_at: string;
};

export type OrderOptionsType = {
    payment_methods: {label: string, value: string}[];
};

export type OrderCreationType = {
    customer_id: number;
    payment_method: string;
    products: OrderProductType[];
    deferred_date?: string;
    comment?: string;
    vat_total: number;
    no_vat_total: number;
};

export type OrderProductType = {
    product_type: string;
    ordered_quantity: number;
    product_id: number;
    size_id?: number;
};
