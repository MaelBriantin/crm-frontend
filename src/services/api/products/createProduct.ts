import { ProductType } from '../../../types/ProductTypes';
import { fetchAPI, handleAPIResponse } from '../fetchApi.config';
import { APIResponseFormat } from '../../../types/FetchTypes';
import { CallToastProps } from '../../../contexts/global/ToastContext';

export const createProduct = async (product: ProductType, callToast: CallToastProps, refreshProducts: { (): Promise<void>; (): void; }, closeModal?: { (): void; (): void; }) => {
    let productsResponse: ProductType[] = [];
    try {
        const response: APIResponseFormat<ProductType> = await fetchAPI('/api/products', 'POST', product);
        handleAPIResponse<ProductType>(
            response,
            async (products) => {
                productsResponse = products as ProductType[];
                await refreshProducts();
                callToast('success', `Le produit ${product.name} a bien été créé.`, 3000);
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
    return productsResponse;
}