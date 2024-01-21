import { useState, useEffect } from 'react';
import { fetchAPI, handleAPIResponse } from '../services/api/fetchApi.config.ts';
import { SectorType } from '../types/DataTypes.ts';

/**
 * Custom hook for fetching sectors.
 * @param options - The options for fetching sectors ('withPostCodes').
 * @returns An array of sectors.
 */
export const useFetchSectors = (options: string) => {
    const withPostCodes = options === 'withPostCodes';
    const [sectors, setSectors] = useState<SectorType[]>([]);

    useEffect(() => {
        fetchSectors();
    }, []);

    const fetchSectors = async () => {
        try {
            const response = await fetchAPI<null, SectorType[]>('/api/sectorsWithPostcodes');

            handleAPIResponse<SectorType>(
                response,
                (sectors) => {
                    setSectors(sectors as SectorType[]);
                },
                (error) => {
                    console.error(error.message);
                }
            );
        } catch (error) {
            console.error(error);
        }
    }

    return withPostCodes
        ? sectors.map((sector) => {
            const postcodes = sector.postcodes.map((postcode) => {
                return postcode.postcode;
            });
            return {
                ...sector,
                postcodes: postcodes
            };
        }
        ) : sectors;
}