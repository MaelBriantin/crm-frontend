import { CustomerType } from '../../../types/CustomerTypes';
import { fetchAPI, handleAPIResponse } from '../fetchApi.config';
import { APIResponseFormat } from '../../../types/FetchTypes';
import { CallToastProps } from '../../../contexts/global/ToastContext';

export const deleteCustomer = async (customer: CustomerType, callToast: CallToastProps, refreshCustomers: { (): Promise<void>; (): void; }, closeModal?: { (): void; (): void; }) => {
    let customerResponse: CustomerType[] = [];
    try {
        const response: APIResponseFormat<CustomerType> = await fetchAPI(`/api/customers/${customer.id}`, 'DELETE');
        handleAPIResponse<CustomerType>(
            response,
            async (customers) => {
                customerResponse = customers as CustomerType[];
                await refreshCustomers();
                callToast('success', `Le client a bien été retiré de votre base de données.`, 3000);
                closeModal && closeModal();
            },
            (error) => {
                console.error(error.message);
                callToast('error', error.message, 10000);
            }
        );
    } catch (error) {
        console.error(error);
    }
    return customerResponse;
};