export type OrderType = {
    id: number;
    customer_id: number;
    products: {product_id: number, quantity: number}[];
    status: string;
    created_at: string;
    updated_at: string;
};