import {fetchAPI, handleAPIResponse} from "../fetchApi.config.ts";
import {OrderOptionsType} from "../../../types/OrderTypes.ts";

export const fetchAllOrderOptions = async () => {
    let orderOptionsResponse: OrderOptionsType[] = [];

    try {
        const response = await fetchAPI<null, OrderOptionsType[]>(`/api/orderOptions`);
        handleAPIResponse<OrderOptionsType>(
            response,
            (orderOptions) => {
                orderOptionsResponse = orderOptions as OrderOptionsType[];
            },
            (error) => {
                console.error(error.message);
            }
        );
    } catch (error) {
        console.error(error);
    }
    return orderOptionsResponse;
}