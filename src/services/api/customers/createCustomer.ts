import { fetchAPI, handleAPIResponse } from '../fetchApi.config';
import { CustomerType } from '../../../types/CustomerTypes';
import { APIResponseFormat } from '../../../types/FetchTypes';
import { CallToastProps } from '../../../contexts/global/ToastContext';


/**
 * Creates a new customer.
 * 
 * @param newCustomer - The customer object to be created.
 * @param callToast - A function to display toast notifications.
 * @param refreshBrands - A function to refresh the list of brands.
 * @param closeModal - A function to close the modal.
 * @returns A promise that resolves to an array of customers.
 */
export const createCustomer = async (newCutomer: CustomerType, callToast: CallToastProps, refreshCustomers: { (): Promise<void>; (): void; }, closeModal: { (): void; (): void; }) => {
    let customersResponse: CustomerType[] = [];
    try {
        const response: APIResponseFormat<CustomerType> = await fetchAPI('/api/customers', 'POST', newCutomer);
        handleAPIResponse<CustomerType>(
            response,
            async (customers) => {
                customersResponse = customers as CustomerType[];
                await refreshCustomers();
                callToast('success', `Le client ${newCutomer.firstname} ${newCutomer.lastname} a été créé avec succès.`, 3000);
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