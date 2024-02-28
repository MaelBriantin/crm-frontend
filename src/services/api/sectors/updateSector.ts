import { fetchAPI, handleAPIResponse } from "../fetchApi.config";
import { SectorType } from "../../../types/SectorTypes";
import { APIResponseFormat } from "../../../types/FetchTypes";
import { CallToastProps } from "../../../contexts/global/ToastContext";

export const updateSector = async (sector: SectorType, callToast: CallToastProps, refreshSectors: { (): Promise<void>; (): void; }, closeModal: { (): void; (): void; }) => {
    let sectorsResponse: SectorType[] = []
    try {
        const response: APIResponseFormat<SectorType> = await fetchAPI(`/api/sectors/${sector.id}`, 'PATCH', sector);
        handleAPIResponse<SectorType>(
            response,
            async (sectors) => {
                sectorsResponse = sectors as SectorType[];
                await refreshSectors();
                callToast('success', `Le secteur ${sector.name} a été modifié avec succès.`, 3000);
                closeModal();
            },
            (error) => {
                console.error(error.message);
                callToast('error', error.message, 5000);
            }
        );
    } catch (error) {
        console.error(error);
    }
    return sectorsResponse;
}
