import { SectorType } from "../../../types/SectorTypes";
import { fetchAPI } from "../fetchApi.config";

export const createSector = async (newSector: SectorType) => {
    console.log(newSector);
    await fetchAPI('/api/sectors', 'POST', newSector);
};