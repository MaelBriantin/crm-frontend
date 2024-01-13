import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { isEmpty } from '../utils/helpers/spells.ts';
import { Loader } from '../components/global/Loader.tsx';
import { fetchAPI, handleAPIResponse } from '../services/api/fetchApi.config.ts';
import { DataTable } from '../components/global/DataTable.tsx';
import { SectorType } from '../types/DataTypes.ts';

export const SectorPage: React.FC = () => {
    const [sectors, setSectors] = useState<SectorType[]>([]);

    useEffect(() => {
        fetchSectors();
    }, []);

    const fetchSectors = async (): Promise<SectorType[] | []> => {
        try {
            const response = await fetchAPI<null, SectorType[]>('/api/sectors');

            handleAPIResponse<SectorType>(
                response,
                (sectors) => {
                    setSectors(sectors as SectorType[]);
                },
                (error) => {
                    console.error(error.message);
                }
            );
            return [];
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    const columns = [
        {
            text: 'Identifiant',
            value: 'id',
            sortable: true
        },
        {
            text: 'Nom du secteur',
            value: 'name',
            sortable: true
        },
        {
            text: 'Codes postaux associés',
            value: 'postcodes',
            sortable: false,
            type: 'chips'
        },
    ];

    const sectorsData = sectors.map((sector) => {
        return {
            ...sector,
            postcodes: sector.postcodes.map((postcode) => postcode.postcode),
        };
    });

    return (
        <Container>
            {isEmpty(sectors) && <Loader />}
            {!isEmpty(sectors) &&

                <DataTable data={sectorsData} columns={columns} selectable />

            }
        </Container>
    );
};

const Container = styled.div`
    position: relative;
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
`;

