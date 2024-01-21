import React from 'react';
import styled from 'styled-components';
import { isEmpty } from '../utils/helpers/spells.ts';
import { Loader } from '../components/global/Loader.tsx';
import { DataTable } from '../components/DataTable';
import { useSectors } from '../hooks/useSectors.ts';
import { RowDataType } from '../types/DataTableTypes.ts';

export const SectorPage: React.FC = () => {

    const sectors = useSectors('withPostcodes');

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

    return (
        <Container>
            {isEmpty(sectors) && <Loader />}
            {!isEmpty(sectors) &&
                <DataTable data={sectors as RowDataType[]} columns={columns} selectable />
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

