import { SectorType } from '../../../types/DataTypes';
import { fetchAPI, handleAPIResponse } from '../fetchApi.config.ts';

export const fetchSectors = async (id: number, options: string | null = null) => {
    const withPostCodes = options && options === 'withPostcodes';
    let sectorResponse: SectorType[] = [];
    try {
        const response = await fetchAPI<null, SectorType[]>(`/api/${withPostCodes ? 'sectorsWithPostcodes' : 'sectors'}/${id}`);
        handleAPIResponse<SectorType>(
            response,
            (sector) => {
                sectorResponse = sector as SectorType[];
            },
            (error) => {
                console.error(error.message);
            }
        );
    } catch (error) {
        console.error(error);
    }
    return sectorResponse;
}