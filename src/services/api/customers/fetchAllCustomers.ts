import { CustomerType } from '../../../types/CustomerTypes.ts';
import { fetchAPI, handleAPIResponse } from '../fetchApi.config.ts';

export const fetchAllCustomers = async () => {
    let customersResponse: CustomerType[] = [];
    
    try {
        const response = await fetchAPI<null, CustomerType[]>(`/api/customers`);
        handleAPIResponse<CustomerType>(
            response,
            (customers) => {
                customersResponse = customers as CustomerType[];
            },
            (error) => {
                console.error(error.message);
            }
        );
    } catch (error) {
        console.error(error);
    }
    return customersResponse;
}