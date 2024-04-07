import { ProductOptionsType } from '../../../types/ProductType';
import { fetchAPI, handleAPIResponse } from '../fetchApi.config';

export const fetchProductOptions = async () => {
    let productOptionsResponse: ProductOptionsType[] = [];
    
    try {
        const response = await fetchAPI<null, ProductOptionsType[]>(`/api/productOptions`);
        handleAPIResponse<ProductOptionsType>(
            response,
            (productOptions) => {
                productOptionsResponse = productOptions as ProductOptionsType[];
            },
            (error) => {
                console.error(error.message);
            }
        );
    } catch (error) {
        console.error(error);
    }
    return productOptionsResponse;
};