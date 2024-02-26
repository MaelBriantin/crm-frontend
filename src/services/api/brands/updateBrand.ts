import { BrandType } from '../../../types/BrandTypes';
import { handleAPIResponse } from '../fetchApi.config';
import { APIResponseFormat } from '../../../types/FetchTypes';
import { fetchAPI } from '../fetchApi.config';
import { CallToastProps } from '../../../contexts/global/ToastContext';


export const updateBrand = async (updatedBrand: BrandType, callToast: CallToastProps, refreshBrands: { (): Promise<void>; (): void; }, closeModal: { (): void; (): void; }) => {
    let brandsResponse: BrandType[] = [];
    try {
        const response: APIResponseFormat<BrandType> = await fetchAPI(`/api/brands/${updatedBrand.id}`, 'PUT', updatedBrand);
        handleAPIResponse<BrandType>(
            response,
            async (brands) => {
                brandsResponse = brands as BrandType[];
                await refreshBrands();
                callToast('success', `La marque ${updatedBrand.name} a été modifiée avec succès.`, 3000);
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
}