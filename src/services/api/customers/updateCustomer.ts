import { CustomerType } from '../../../types/CustomerTypes';
import { handleAPIResponse } from '../fetchApi.config';
import { APIResponseFormat } from '../../../types/FetchTypes';
import { fetchAPI } from '../fetchApi.config';
import { CallToastProps } from '../../../contexts/global/ToastContext';


export const updateCustomer = async (customer: CustomerType, callToast: CallToastProps, refreshData: () => void, closeModal: { (): void; (): void; }) => {
    let customersResponse: CustomerType[] = [];
    try {
        const response: APIResponseFormat<CustomerType> = await fetchAPI(`/api/customers/${customer.id}`, 'PATCH', customer);
        handleAPIResponse<CustomerType>(
            response,
            async (customers) => {
                customersResponse = customers as CustomerType[];
                refreshData();
                callToast('success', `Les données concernant ce client ont été modifiées avec succès.`, 3000);
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
    return customersResponse;
}