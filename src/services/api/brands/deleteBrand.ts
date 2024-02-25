import { BrandType } from '../../../types/BrandTypes';
import { fetchAPI, handleAPIResponse } from '../fetchApi.config';
import { APIResponseFormat } from '../../../types/FetchTypes';
import { CallToastProps } from '../../../contexts/global/ToastContext';

export const deleteBrand = async (brand: BrandType, callToast: CallToastProps, refreshBrands: { (): Promise<void>; (): void; }, closeModal: { (): void; (): void; }) => {
    let brandsResponse: BrandType[] = [];
    try {
        const response: APIResponseFormat<BrandType> = await fetchAPI(`/api/brands/${brand.id}`, 'DELETE');
        handleAPIResponse<BrandType>(
            response,
            (brands) => {
                brandsResponse = brands as BrandType[];
                refreshBrands();
                callToast('success', `La marque "${brand.name}" a bien été supprimée.`, 3000);
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
    return brandsResponse;
};