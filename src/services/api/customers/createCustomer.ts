import { fetchAPI, handleAPIResponse } from '../fetchApi.config';
import { CustomerType } from '../../../types/CustomerTypes';
import { APIResponseFormat } from '../../../types/FetchTypes';
import { CallToastProps } from '../../../contexts/global/ToastContext';


/**
 * Creates a new customer.
 *
 * @param newCustomer
 * @param callToast - A function to display toast notifications.
 * @param refreshCustomers
 * @param closeModal - A function to close the modal.
 * @returns A promise that resolves to an array of customers.
 */
export const createCustomer = async (newCustomer: CustomerType, callToast: CallToastProps, refreshCustomers: { (): Promise<void>; (): void; }, closeModal: { (): void; (): void; }) => {
    let customersResponse: CustomerType[] = [];
    try {
        const response: APIResponseFormat<CustomerType> = await fetchAPI('/api/customers', 'POST', newCustomer);
        handleAPIResponse<CustomerType>(
            response,
            async (customers) => {
                customersResponse = customers as CustomerType[];
                await refreshCustomers();
                callToast('success', `Le client ${newCustomer.firstname} ${newCustomer.lastname} a été créé avec succès.`, 3000);
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