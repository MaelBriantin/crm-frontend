import { SectorType } from "../../../types/SectorTypes";
import { handleAPIResponse } from "../fetchApi.config";
import { APIResponseFormat } from "../../../types/FetchTypes";
import { fetchAPI } from "../fetchApi.config";
import { CallToastProps } from "../../../contexts/global/ToastContext";

/**
 * Creates a new sector.
 * @param newSector The new sector to create.
 * @returns The array of sectors with the new sector added.
 */
export const createSector = async (newSector: SectorType, callToast: CallToastProps, refreshSectors: { (): Promise<void>; (): void; }, closeModal: { (): void; (): void; }) => {
    let sectorsResponse: SectorType[] = [];
    try {
        const response: APIResponseFormat<SectorType> = await fetchAPI('/api/sectors', 'POST', newSector);
        handleAPIResponse<SectorType>(
            response,
            async (sectors) => {
                sectorsResponse = sectors as SectorType[];
                await refreshSectors();
                callToast('success', `Le secteur ${newSector.name} a été créé avec succès.`, 3000);
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
    return sectorsResponse;
};