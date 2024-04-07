import { ProductType } from '../../../types/ProductType.ts';
import { fetchAPI, handleAPIResponse } from '../fetchApi.config.ts';

export const fetchAllProducts = async () => {
    let productResponse: ProductType[] = [];
    
    try {
        const response = await fetchAPI<null, ProductType[]>(`/api/products`);
        handleAPIResponse<ProductType>(
            response,
            (products) => {
                productResponse = products as ProductType[];
            },
            (error) => {
                console.error(error.message);
            }
        );
    } catch (error) {
        console.error(error);
    }
    return productResponse;
}