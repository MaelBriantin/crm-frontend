import {OrderedProduct} from "../stores/useStoreOrders.ts";
import {ProductType} from "../types/ProductTypes.ts";

export const cartTotal = (products: ProductType[], cart: OrderedProduct[], vat?: boolean) => {
    if (!vat) {
        const total = cart.reduce((acc, product) => {
            const storeProduct = products.find((p) => Number(p.id) === product.product_id) as ProductType;
            return acc + (storeProduct.selling_price * product.ordered_quantity);
        }, 0);
        return parseFloat(total.toFixed(2))
    }
    const total= cart.reduce((acc, product) => {
        const storeProduct = products.find((p) => Number(p.id) === product.product_id) as ProductType;
        return acc + (storeProduct.selling_price_with_vat * product.ordered_quantity);
    }, 0);
    return parseFloat(total.toFixed(2))
}