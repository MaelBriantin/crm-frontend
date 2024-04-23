import { ProductType } from '../../../types/ProductTypes';
import { fetchAPI, handleAPIResponse } from '../fetchApi.config';
import { CallToastProps } from '../../../contexts/global/ToastContext';
import { APIResponseFormat } from '../../../types/FetchTypes';

export const updateProduct = async (product: ProductType, callToast: CallToastProps, refreshProducts: { (): Promise<void>; (): void; }, closeModal: { (): void; (): void; }) => {
    let productsResponse: ProductType[] = [];
    try {
        const response: APIResponseFormat<ProductType> = await fetchAPI(`/api/products/${product.id}`, 'PATCH', product);
        handleAPIResponse<ProductType>(
            response,
            async (products) => {
                productsResponse = products as ProductType[];
                await refreshProducts();
                callToast('success', `Les données concernant ce produit ont été modifiées avec succès.`, 3000);
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
    return productsResponse;
}