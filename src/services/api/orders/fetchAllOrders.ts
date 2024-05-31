import {fetchAPI, handleAPIResponse} from "../fetchApi.config.ts";
import {OrderType} from "../../../types/OrderTypes.ts";

export const fetchAllOrders = async (): Promise<OrderType[]> => {
    let ordersResponse: OrderType[] = [];

    try {
        const response = await fetchAPI<null, OrderType[]>(`/api/orders`);
        handleAPIResponse<OrderType>(
            response,
            (orders) => {
                ordersResponse = orders as OrderType[];
            },
            (error) => {
                console.error(error.message);
            }
        );
    } catch (error) {
        console.error(error);
    }
    return ordersResponse;
}
