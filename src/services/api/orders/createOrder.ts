import { CallToastProps } from "../../../contexts/global/ToastContext";
import { APIResponseFormat } from "../../../types/FetchTypes";
import { OrderCreationType, OrderType } from "../../../types/OrderTypes";
import { fetchAPI, handleAPIResponse } from "../fetchApi.config";

export const createOrder = async (newOrder: OrderCreationType, callToast: CallToastProps, refreshOrders: { (): Promise<void>; (): void; }, closeModal: { (): void; (): void; }) => {
    let orederResponse: OrderType[] = [];
    try {
        const response: APIResponseFormat<OrderType> = await fetchAPI('/api/orders', 'POST', newOrder);
        handleAPIResponse<OrderType>(
            response,
            async (orders) => {
                orederResponse = orders as OrderType[];
                await refreshOrders();
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
    return orederResponse;
};