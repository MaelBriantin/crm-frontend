import { BrandType } from '../../../types/BrandTypes';
import { handleAPIResponse } from '../fetchApi.config';
import { APIResponseFormat } from '../../../types/FetchTypes';
import { fetchAPI } from '../fetchApi.config';
import { firstOf } from '../../../utils/helpers/spells';

export const fetchBrand = async (id: string): Promise<BrandType> => {
    let brand: BrandType = {} as BrandType;
    try {
        const response: APIResponseFormat<BrandType> = await fetchAPI(`/api/brands/${id}`, 'GET');
        handleAPIResponse<BrandType>(
            response,
            (brandResponse) => {
                brand = firstOf(brandResponse) as BrandType;
            },
            (error) => {
                console.error(error.message);
            }
        );
    } catch (error) {
        console.error(error);
    }
    return brand;
}