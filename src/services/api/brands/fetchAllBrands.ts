import { BrandType } from "../../../types/BrandTypes";
import { handleAPIResponse } from "../fetchApi.config";
import { fetchAPI } from "../fetchApi.config";

export const fetchAllBrands = async () => {
    let brandsResponse: BrandType[] = [];
    try {
        const response = await fetchAPI<null, BrandType[]>(`/api/brands`);
        handleAPIResponse<BrandType>(
            response,
            (brands) => {
                brandsResponse = brands as BrandType[];
            },
            (error) => {
                console.error(error.message);
            }
        );
    } catch (error) {
        console.error(error);
    }
    return brandsResponse;
}