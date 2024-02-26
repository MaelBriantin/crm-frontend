import { BrandType } from "../../../types/BrandTypes";
import { handleAPIResponse } from "../fetchApi.config";
import { APIResponseFormat } from "../../../types/FetchTypes";
import { fetchAPI } from "../fetchApi.config";
import { CallToastProps } from "../../../contexts/global/ToastContext";


/**
 * Creates a new brand.
 * 
 * @param newBrand - The new brand to create.
 * @param callToast - The function to call to display a toast message.
 * @param refreshBrands - The function to refresh the list of brands.
 * @param closeModal - The function to close the modal.
 * @returns The response containing the created brand.
 */
export const createBrand = async (newBrand: BrandType, callToast: CallToastProps, refreshBrands: { (): Promise<void>; (): void; }, closeModal: { (): void; (): void; }) => {
    let brandsResponse: BrandType[] = [];
    try {
        const response: APIResponseFormat<BrandType> = await fetchAPI('/api/brands', 'POST', newBrand);
        handleAPIResponse<BrandType>(
            response,
            async (brands) => {
                brandsResponse = brands as BrandType[];
                await refreshBrands();
                callToast('success', `La marque ${newBrand.name} a été créé avec succès.`, 3000);
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