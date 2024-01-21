import React, { useEffect } from 'react';
import styled from 'styled-components';
import { firstOf, isEmpty } from '../utils/helpers/spells.ts';
import { Loader } from '../components/global/Loader.tsx';
import { DataTable } from '../components/DataTable';
import { RowDataType } from '../types/DataTableTypes.ts';
import { RowType } from '../types/DataTableTypes.ts';
import { SectorType } from '../types/DataTypes.ts';
import { fetchAllSectors, fetchSectors } from '../services/api/sectors';

export const SectorPage: React.FC = () => {
    
    const [sectors, setSectors] = React.useState<SectorType[]>([]);

    useEffect(() => {
        const fetchSectors = async () => {
            const sectors = await fetchAllSectors();
            setSectors(sectors as SectorType[]);
        };
        fetchSectors();
    }, []);

    const columns = [
        {
            text: 'Identifiant',
            value: 'id',
            sortable: true,
            type: 'number',
            // color: [
            //     { value: '*<10', text: 'blue' }
            // ]
        },
        {
            text: 'Nom du secteur',
            value: 'name',
            sortable: true,
            // color: [
            //     { value: 'et', text: 'red' }
            // ]
        },
        {
            text: 'Nombre de communes',
            value: 'postcodes_count',
            sortable: true,
            type: 'number',
            // color: [
            //     { value: '*', text: 'green' }
            // ]
        },
    ];

    // const handleClick = (row: RowType) => {
    //     console.log('click', row);
    // };

    const handleDoubleClick = async (row: RowType) => {
        const sector = await fetchSectors(row.id as SectorType['id'], 'withPostcodes');
        console.log('sector', firstOf(sector)); 
    };

    return (
        <Container>
            {isEmpty(sectors) && <Loader />}
            {!isEmpty(sectors) &&
                <DataTable data={sectors as unknown as RowDataType[]} columns={columns} onDoubleClickOnRow={handleDoubleClick} />
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

