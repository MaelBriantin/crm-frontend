import { CallToastProps } from "../../../contexts/global/ToastContext";
import { APIResponseFormat } from "../../../types/FetchTypes";
import { OrderCreationType, OrderType } from "../../../types/OrderTypes";
import { fetchAPI, handleAPIResponse } from "../fetchApi.config";

export const createOrder = async (newOrder: OrderCreationType, callToast: CallToastProps, refreshData: { (): Promise<void>; (): void; }, closeModal: { (): void; (): void; }) => {
    let orderResponse: OrderType[] = [];
    try {
        const response: APIResponseFormat<OrderType> = await fetchAPI('/api/orders', 'POST', newOrder);
        handleAPIResponse<OrderType>(
            response,
            async (orders) => {
                orderResponse = orders as OrderType[];
                await refreshData();
                callToast('success', `Commande enregistrée avec succès.`, 3000);
                closeModal();
            },
            (error) => {
                console.error(error.message);
                callToast('error', error.message, 10000);
            }
        );
    } catch (error) {
        console.error(error);
    }
    return orderResponse;
};