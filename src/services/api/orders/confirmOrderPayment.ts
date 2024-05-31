import {OrderDetailsType} from "../../../types/OrderTypes.ts";
import {fetchAPI} from "../fetchApi.config.ts";

export const confirmOrderPayment = async (id: OrderDetailsType['id']) => {
    try {
        await fetchAPI(`/api/orders/${id}/confirmPayment`, 'PATCH');
    } catch (error) {
        console.error(error);
    }
    return false;
}
