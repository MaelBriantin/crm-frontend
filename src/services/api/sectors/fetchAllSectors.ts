import { SectorType } from '../../../types/SectorTypes.ts';
import { fetchAPI, handleAPIResponse } from '../fetchApi.config.ts';

export const fetchAllSectors = async (options: 'withPostcodes' | null = null) => {
    const withPostCodes = options && options === 'withPostcodes';
    let sectorsResponse: SectorType[] = [];
    
    try {
        const response = await fetchAPI<null, SectorType[]>(`/api/${withPostCodes ? 'sectorsWithPostcodes' : 'sectors'}`);
        handleAPIResponse<SectorType>(
            response,
            (sectors) => {
                sectorsResponse = sectors as SectorType[];
            },
            (error) => {
                console.error(error.message);
            }
        );
    } catch (error) {
        console.error(error);
    }
    return sectorsResponse;
}