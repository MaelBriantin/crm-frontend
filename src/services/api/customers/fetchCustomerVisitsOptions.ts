import { RelationshipType, VisitFrequencyType } from '../../../types/CustomerTypes';
import { fetchAPI, handleAPIResponse } from '../fetchApi.config';

export const fetchCustomerFrequencies = async () => {
    let frequenciesResponse: VisitFrequencyType[] = [];
    
    try {
        const response = await fetchAPI<null, VisitFrequencyType[]>(`/api/visitFrequencies`);
        handleAPIResponse<VisitFrequencyType>(
            response,
            (frequencies) => {
                frequenciesResponse = frequencies as VisitFrequencyType[];
            },
            (error) => {
                console.error(error.message);
            }
        );
    } catch (error) {
        console.error(error);
    }
    return frequenciesResponse;
};

export const fetchCustomerRelationships = async () => {
    let relationshipsResponse: RelationshipType[] = [];

    try {
        const response = await fetchAPI<null, RelationshipType[]>(`/api/relationships`);
        handleAPIResponse<RelationshipType>(
            response,
            (relationships) => {
                relationshipsResponse = relationships as RelationshipType[];
            },
            (error) => {
                console.error(error.message);
            }
        );
    } catch (error) {
        console.error(error);
    }
    return relationshipsResponse;
};