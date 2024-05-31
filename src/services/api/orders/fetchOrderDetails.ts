import {OrderDetailsType} from "../../../types/OrderTypes.ts";
import {fetchAPI, handleAPIResponse} from "../fetchApi.config.ts";

export const fetchOrderDetails = async (orderId: number) => {
    let ordersDetailsResponse: OrderDetailsType[] = [];

    try {
        const response = await fetchAPI<null, OrderDetailsType[]>(`/api/orders/${orderId}`);
        handleAPIResponse<OrderDetailsType>(
            response,
            (order) => {
                ordersDetailsResponse = order as OrderDetailsType[]
            },
            (error) => {
                console.error(error.message);
            }
        );
    }
    catch (error) {
        console.error(error);
    }
    return ordersDetailsResponse;
}